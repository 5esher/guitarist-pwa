import { Song } from "../types";

export const parseUltimateGuitar = (content: string): Omit<Song, "id"> => {
  const lines = content.split(/\r?\n/);
  let title = "Imported Song";
  let author = "Unknown";
  let originalKey = "C";
  let bpm: number | null = null;
  const textLines: string[] = [];

  for (const line of lines) {
    if (line.toLowerCase().startsWith("title:")) {
      title = line.split(":")[1]?.trim() || title;
      continue;
    }
    if (line.toLowerCase().startsWith("artist:")) {
      author = line.split(":")[1]?.trim() || author;
      continue;
    }
    if (line.toLowerCase().startsWith("key:")) {
      originalKey = line.split(":")[1]?.trim() || originalKey;
      continue;
    }
    if (line.toLowerCase().startsWith("bpm:")) {
      const value = Number(line.split(":")[1]?.trim());
      bpm = Number.isNaN(value) ? bpm : value;
      continue;
    }
    textLines.push(line);
  }

  return {
    title,
    author,
    originalKey,
    bpm,
    textWithChords: textLines.join("\n")
  };
};
