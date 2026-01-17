import { Chord } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchChords = async (): Promise<Chord[]> => {
  const response = await fetch(`${API_URL}/chords`);
  if (!response.ok) {
    throw new Error("Failed to fetch chords");
  }
  return response.json() as Promise<Chord[]>;
};

export const fetchChordByName = async (name: string): Promise<Chord> => {
  const response = await fetch(`${API_URL}/chords/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch chord");
  }
  return response.json() as Promise<Chord>;
};

export const createChord = async (payload: { name: string; fingering: Chord["fingering"] }): Promise<Chord> => {
  const response = await fetch(`${API_URL}/chords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Failed to create chord");
  }
  return response.json() as Promise<Chord>;
};

export const updateChord = async (
  name: string,
  fingering: Chord["fingering"]
): Promise<Chord> => {
  const response = await fetch(`${API_URL}/chords/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fingering })
  });
  if (!response.ok) {
    throw new Error("Failed to update chord");
  }
  return response.json() as Promise<Chord>;
};
