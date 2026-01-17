import { pool } from "../../db";

export type UserProfile = {
  clientId: string;
  displayName: string;
  instrument: string;
};

export const getProfile = async (clientId: string): Promise<UserProfile | null> => {
  const result = await pool.query(
    "SELECT client_id, display_name, instrument FROM user_profiles WHERE client_id = $1",
    [clientId]
  );
  const row = result.rows[0];
  if (!row) {
    return null;
  }
  return {
    clientId: row.client_id,
    displayName: row.display_name,
    instrument: row.instrument
  };
};

export const upsertProfile = async (clientId: string, displayName: string, instrument: string) => {
  const result = await pool.query(
    `INSERT INTO user_profiles (client_id, display_name, instrument)
     VALUES ($1, $2, $3)
     ON CONFLICT (client_id)
     DO UPDATE SET display_name = EXCLUDED.display_name, instrument = EXCLUDED.instrument, updated_at = NOW()
     RETURNING client_id, display_name, instrument`,
    [clientId, displayName, instrument]
  );
  const row = result.rows[0];
  return {
    clientId: row.client_id,
    displayName: row.display_name,
    instrument: row.instrument
  };
};
