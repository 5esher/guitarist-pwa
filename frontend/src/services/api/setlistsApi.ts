import { Setlist } from "../types";
import { getClientId } from "../favorites/favoritesService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type SetlistItemInput = {
  songId: string;
  position: number;
  durationSeconds: number;
};

export const fetchSetlists = async (): Promise<Setlist[]> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/setlists?clientId=${clientId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch setlists");
  }
  return response.json() as Promise<Setlist[]>;
};

export const fetchSetlistById = async (id: string): Promise<Setlist> => {
  const response = await fetch(`${API_URL}/setlists/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch setlist");
  }
  return response.json() as Promise<Setlist>;
};

export const createSetlist = async (title: string, items: SetlistItemInput[]) => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/setlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, title, items })
  });
  if (!response.ok) {
    throw new Error("Failed to create setlist");
  }
  return response.json() as Promise<Setlist>;
};

export const updateSetlist = async (id: string, title: string, items: SetlistItemInput[]) => {
  const response = await fetch(`${API_URL}/setlists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, items })
  });
  if (!response.ok) {
    throw new Error("Failed to update setlist");
  }
  return response.json() as Promise<Setlist>;
};
