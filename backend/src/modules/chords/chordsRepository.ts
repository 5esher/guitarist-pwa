import { pool } from "../../db";
import { Chord } from "../../entities/chord";

type ChordRow = {
  id: string;
  name: string;
  fingering: unknown;
};

const mapChord = (row: ChordRow): Chord => ({
  id: row.id,
  name: row.name,
  fingering: row.fingering as Record<string, unknown>
});

export const getChords = async (): Promise<Chord[]> => {
  const result = await pool.query("SELECT id, name, fingering FROM chords ORDER BY name ASC");
  return result.rows.map(mapChord);
};

export const getChordByName = async (name: string): Promise<Chord | null> => {
  const result = await pool.query("SELECT id, name, fingering FROM chords WHERE name = $1", [name]);
  const row = result.rows[0] as ChordRow | undefined;
  return row ? mapChord(row) : null;
};

export const createChord = async (name: string, fingering: unknown): Promise<Chord> => {
  const result = await pool.query(
    "INSERT INTO chords (name, fingering) VALUES ($1, $2) RETURNING id, name, fingering",
    [name, fingering]
  );
  return mapChord(result.rows[0]);
};

export const updateChord = async (name: string, fingering: unknown): Promise<Chord | null> => {
  const result = await pool.query(
    "UPDATE chords SET fingering = $2 WHERE name = $1 RETURNING id, name, fingering",
    [name, fingering]
  );
  const row = result.rows[0] as ChordRow | undefined;
  return row ? mapChord(row) : null;
};
