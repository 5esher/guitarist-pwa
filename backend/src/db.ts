import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});

export const initDb = async () => {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS songs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      original_key TEXT NOT NULL,
      bpm INTEGER,
      text_tabs TEXT,
      strum_pattern TEXT,
      text_with_chords TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS chords (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE,
      fingering JSONB NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS song_chords (
      song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
      chord TEXT NOT NULL,
      position INTEGER NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorite_songs (
      client_id TEXT NOT NULL,
      song_id UUID REFERENCES songs(id) ON DELETE CASCADE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorite_chords (
      client_id TEXT NOT NULL,
      chord_name TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      client_id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      instrument TEXT DEFAULT 'guitar',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS setlists (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_id TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS setlist_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      setlist_id UUID REFERENCES setlists(id) ON DELETE CASCADE,
      song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
      position INTEGER NOT NULL,
      duration_seconds INTEGER DEFAULT 180
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS song_comments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
      client_id TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comment_versions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      comment_id UUID REFERENCES song_comments(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comment_votes (
      comment_id UUID REFERENCES song_comments(id) ON DELETE CASCADE,
      client_id TEXT NOT NULL,
      vote INTEGER NOT NULL,
      PRIMARY KEY (comment_id, client_id)
    );
  `);
};
