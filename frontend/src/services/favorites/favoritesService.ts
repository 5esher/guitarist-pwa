import { Chord, Song } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const STORAGE_KEY = "guitarist_favorites";

export type FavoritesState = {
  songs: string[];
  chords: string[];
};

export const getClientId = () => {
  const existing = localStorage.getItem("guitarist_client_id");
  if (existing) {
    return existing;
  }
  const id = crypto.randomUUID();
  localStorage.setItem("guitarist_client_id", id);
  return id;
};

export const loadLocalFavorites = (): FavoritesState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { songs: [], chords: [] };
  }
  try {
    const parsed = JSON.parse(raw) as FavoritesState;
    return {
      songs: Array.isArray(parsed.songs) ? parsed.songs : [],
      chords: Array.isArray(parsed.chords) ? parsed.chords : []
    };
  } catch {
    return { songs: [], chords: [] };
  }
};

export const saveLocalFavorites = (favorites: FavoritesState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const syncFavorites = async (favorites: FavoritesState) => {
  const clientId = getClientId();
  await fetch(`${API_URL}/favorites/${clientId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favorites)
  });
};

export const fetchFavorites = async (): Promise<FavoritesState> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/favorites/${clientId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json() as Promise<FavoritesState>;
};

export const toggleFavoriteSong = (favorites: FavoritesState, song: Song): FavoritesState => {
  const exists = favorites.songs.includes(song.id);
  const songs = exists
    ? favorites.songs.filter((id) => id !== song.id)
    : [...favorites.songs, song.id];
  return { ...favorites, songs };
};

export const toggleFavoriteChord = (favorites: FavoritesState, chord: Chord): FavoritesState => {
  const exists = favorites.chords.includes(chord.name);
  const chords = exists
    ? favorites.chords.filter((name) => name !== chord.name)
    : [...favorites.chords, chord.name];
  return { ...favorites, chords };
};
