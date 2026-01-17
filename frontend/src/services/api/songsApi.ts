import { Song } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await fetch(`${API_URL}/songs`);
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return response.json() as Promise<Song[]>;
};

export const fetchSongById = async (id: string): Promise<Song> => {
  const response = await fetch(`${API_URL}/songs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch song");
  }
  return response.json() as Promise<Song>;
};

export const createSong = async (payload: Omit<Song, "id">): Promise<Song> => {
  const response = await fetch(`${API_URL}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Failed to create song");
  }
  return response.json() as Promise<Song>;
};
