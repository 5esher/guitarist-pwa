import { pool } from "../../db";

export type SetlistItemInput = {
  songId: string;
  position: number;
  durationSeconds: number;
};

export type SetlistItem = SetlistItemInput & {
  id: string;
  title: string;
  author: string;
};

export type Setlist = {
  id: string;
  clientId: string;
  title: string;
  items: SetlistItem[];
};

const fetchItems = async (setlistId: string): Promise<SetlistItem[]> => {
  const result = await pool.query(
    `SELECT si.id, si.song_id, si.position, si.duration_seconds, s.title, s.author
     FROM setlist_items si
     JOIN songs s ON s.id = si.song_id
     WHERE si.setlist_id = $1
     ORDER BY si.position ASC`,
    [setlistId]
  );
  const rows = result.rows as {
    id: string;
    song_id: string;
    position: number;
    duration_seconds: number;
    title: string;
    author: string;
  }[];
  return rows.map((row) => ({
    id: row.id,
    songId: row.song_id,
    position: row.position,
    durationSeconds: row.duration_seconds,
    title: row.title,
    author: row.author
  }));
};

export const getSetlists = async (clientId: string): Promise<Setlist[]> => {
  const result = await pool.query(
    "SELECT id, client_id, title FROM setlists WHERE client_id = $1 ORDER BY created_at DESC",
    [clientId]
  );
  const rows = result.rows as { id: string; client_id: string; title: string }[];
  const setlists: Setlist[] = [];
  for (const row of rows) {
    setlists.push({
      id: row.id,
      clientId: row.client_id,
      title: row.title,
      items: await fetchItems(row.id)
    });
  }
  return setlists;
};

export const getSetlistById = async (id: string): Promise<Setlist | null> => {
  const result = await pool.query(
    "SELECT id, client_id, title FROM setlists WHERE id = $1",
    [id]
  );
  const row = (result.rows as { id: string; client_id: string; title: string }[])[0];
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    clientId: row.client_id,
    title: row.title,
    items: await fetchItems(row.id)
  };
};

export const createSetlist = async (clientId: string, title: string, items: SetlistItemInput[]) => {
  const result = await pool.query(
    "INSERT INTO setlists (client_id, title) VALUES ($1, $2) RETURNING id, client_id, title",
    [clientId, title]
  );
  const setlistId = result.rows[0].id as string;
  await replaceItems(setlistId, items);
  return getSetlistById(setlistId);
};

export const updateSetlist = async (id: string, title: string, items: SetlistItemInput[]) => {
  await pool.query("UPDATE setlists SET title = $1 WHERE id = $2", [title, id]);
  await replaceItems(id, items);
  return getSetlistById(id);
};

const replaceItems = async (setlistId: string, items: SetlistItemInput[]) => {
  await pool.query("DELETE FROM setlist_items WHERE setlist_id = $1", [setlistId]);
  for (const item of items) {
    await pool.query(
      `INSERT INTO setlist_items (setlist_id, song_id, position, duration_seconds)
       VALUES ($1, $2, $3, $4)`,
      [setlistId, item.songId, item.position, item.durationSeconds]
    );
  }
};
