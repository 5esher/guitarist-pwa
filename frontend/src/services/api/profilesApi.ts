import { UserProfile } from "../types";
import { getClientId } from "../favorites/favoritesService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchProfile = async (): Promise<UserProfile | null> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/profiles/${clientId}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json() as Promise<UserProfile>;
};

export const saveProfile = async (displayName: string, instrument: string): Promise<UserProfile> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/profiles/${clientId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName, instrument })
  });
  if (!response.ok) {
    throw new Error("Failed to save profile");
  }
  return response.json() as Promise<UserProfile>;
};
