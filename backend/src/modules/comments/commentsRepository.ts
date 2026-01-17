import { pool } from "../../db";

export type CommentVersion = {
  id: string;
  body: string;
  createdAt: string;
};

export type Comment = {
  id: string;
  songId: string;
  clientId: string;
  createdAt: string;
  body: string;
  votes: number;
  versions: CommentVersion[];
};

const getVersions = async (commentId: string): Promise<CommentVersion[]> => {
  const result = await pool.query(
    `SELECT id, body, created_at
     FROM comment_versions
     WHERE comment_id = $1
     ORDER BY created_at DESC`,
    [commentId]
  );
  const rows = result.rows as { id: string; body: string; created_at: string }[];
  return rows.map((row) => ({
    id: row.id,
    body: row.body,
    createdAt: row.created_at
  }));
};

export const getCommentsForSong = async (songId: string): Promise<Comment[]> => {
  const result = await pool.query(
    `SELECT c.id, c.song_id, c.client_id, c.created_at,
      (SELECT body FROM comment_versions WHERE comment_id = c.id ORDER BY created_at DESC LIMIT 1) AS body,
      COALESCE((SELECT SUM(vote) FROM comment_votes WHERE comment_id = c.id), 0) AS votes
     FROM song_comments c
     WHERE c.song_id = $1
     ORDER BY c.created_at DESC`,
    [songId]
  );
  const comments: Comment[] = [];
  const rows = result.rows as {
    id: string;
    song_id: string;
    client_id: string;
    created_at: string;
    body: string | null;
    votes: number | null;
  }[];
  for (const row of rows) {
    comments.push({
      id: row.id,
      songId: row.song_id,
      clientId: row.client_id,
      createdAt: row.created_at,
      body: row.body ?? "",
      votes: Number(row.votes ?? 0),
      versions: await getVersions(row.id)
    });
  }
  return comments;
};

export const createComment = async (songId: string, clientId: string, body: string) => {
  const result = await pool.query(
    `INSERT INTO song_comments (song_id, client_id)
     VALUES ($1, $2)
     RETURNING id, song_id, client_id, created_at`,
    [songId, clientId]
  );
  const commentId = result.rows[0].id as string;
  await addCommentVersion(commentId, body);
  return commentId;
};

export const addCommentVersion = async (commentId: string, body: string) => {
  await pool.query(
    `INSERT INTO comment_versions (comment_id, body)
     VALUES ($1, $2)`,
    [commentId, body]
  );
};

export const voteComment = async (commentId: string, clientId: string, vote: number) => {
  await pool.query(
    `INSERT INTO comment_votes (comment_id, client_id, vote)
     VALUES ($1, $2, $3)
     ON CONFLICT (comment_id, client_id)
     DO UPDATE SET vote = EXCLUDED.vote`,
    [commentId, clientId, vote]
  );
};
