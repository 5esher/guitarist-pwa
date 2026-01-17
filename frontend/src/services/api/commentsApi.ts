import { SongComment } from "../types";
import { getClientId } from "../favorites/favoritesService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchComments = async (songId: string): Promise<SongComment[]> => {
  const response = await fetch(`${API_URL}/comments?songId=${songId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json() as Promise<SongComment[]>;
};

export const createComment = async (songId: string, body: string): Promise<void> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId, clientId, body })
  });
  if (!response.ok) {
    throw new Error("Failed to create comment");
  }
};

export const addCommentVersion = async (commentId: string, body: string): Promise<void> => {
  const response = await fetch(`${API_URL}/comments/${commentId}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body })
  });
  if (!response.ok) {
    throw new Error("Failed to add comment version");
  }
};

export const voteComment = async (commentId: string, vote: number): Promise<void> => {
  const clientId = getClientId();
  const response = await fetch(`${API_URL}/comments/${commentId}/votes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, vote })
  });
  if (!response.ok) {
    throw new Error("Failed to vote");
  }
};
