import { pool } from "../../db";
import { Song } from "../../entities/song";
import { CreateSongDto } from "../../dto/createSongDto";

const mapSong = (row: {
  id: string;
  title: string;
  author: string;
  original_key: string;
  bpm: number | null;
  text_with_chords: string;
}): Song => ({
  id: row.id,
  title: row.title,
  author: row.author,
  originalKey: row.original_key,
  bpm: row.bpm,
  textWithChords: row.text_with_chords
});

export const getSongs = async (): Promise<Song[]> => {
  const result = await pool.query(
    "SELECT id, title, author, original_key, bpm, text_with_chords FROM songs ORDER BY created_at DESC"
  );
  return result.rows.map(mapSong);
};

export const getSongById = async (id: string): Promise<Song | null> => {
  const result = await pool.query(
    "SELECT id, title, author, original_key, bpm, text_with_chords FROM songs WHERE id = $1",
    [id]
  );
  const row = result.rows[0];
  return row ? mapSong(row) : null;
};

export const createSong = async (dto: CreateSongDto): Promise<Song> => {
  const result = await pool.query(
    `INSERT INTO songs (title, author, original_key, bpm, text_with_chords)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, author, original_key, bpm, text_with_chords`,
    [dto.title, dto.author, dto.originalKey, dto.bpm ?? null, dto.textWithChords]
  );
  return mapSong(result.rows[0]);
};

export const createSongs = async (songs: CreateSongDto[]): Promise<Song[]> => {
  const created: Song[] = [];
  for (const song of songs) {
    const item = await createSong(song);
    created.push(item);
  }
  return created;
};
