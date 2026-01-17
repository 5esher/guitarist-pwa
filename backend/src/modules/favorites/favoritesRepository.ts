import { pool } from "../../db";

export const getFavorites = async (clientId: string) => {
  const songs = await pool.query(
    "SELECT song_id FROM favorite_songs WHERE client_id = $1",
    [clientId]
  );
  const chords = await pool.query(
    "SELECT chord_name FROM favorite_chords WHERE client_id = $1",
    [clientId]
  );
  return {
    songs: songs.rows.map((row) => row.song_id as string),
    chords: chords.rows.map((row) => row.chord_name as string)
  };
};

export const replaceFavorites = async (clientId: string, songIds: string[], chordNames: string[]) => {
  await pool.query("DELETE FROM favorite_songs WHERE client_id = $1", [clientId]);
  await pool.query("DELETE FROM favorite_chords WHERE client_id = $1", [clientId]);

  for (const songId of songIds) {
    await pool.query(
      "INSERT INTO favorite_songs (client_id, song_id) VALUES ($1, $2)",
      [clientId, songId]
    );
  }

  for (const chordName of chordNames) {
    await pool.query(
      "INSERT INTO favorite_chords (client_id, chord_name) VALUES ($1, $2)",
      [clientId, chordName]
    );
  }
};
