import { pool } from "./db";
import { initDb } from "./db";
import { seedChords, seedSongs } from "./seedData";

const extractChordPositions = (text: string): { chord: string; position: number }[] => {
  const matches = [...text.matchAll(/\[([^\]]+)\]/g)];
  return matches.map((match) => ({ chord: match[1], position: match.index ?? 0 }));
};

const seed = async () => {
  await initDb();

  await pool.query("DELETE FROM song_chords");
  await pool.query("DELETE FROM chords");
  await pool.query("DELETE FROM songs");

  for (const chord of seedChords) {
    await pool.query(
      "INSERT INTO chords (name, fingering) VALUES ($1, $2)",
      [chord.name, chord.fingering]
    );
  }

  for (const song of seedSongs) {
    const result = await pool.query(
      `INSERT INTO songs (title, author, original_key, bpm, text_with_chords)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [song.title, song.author, song.originalKey, song.bpm, song.textWithChords]
    );
    const songId = result.rows[0].id as string;
    const positions = extractChordPositions(song.textWithChords);
    for (const entry of positions) {
      await pool.query(
        "INSERT INTO song_chords (song_id, chord, position) VALUES ($1, $2, $3)",
        [songId, entry.chord, entry.position]
      );
    }
  }

  await pool.end();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
