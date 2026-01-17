import { Song } from "../types";

export const parseChordPro = (content: string): Omit<Song, "id"> => {
  const lines = content.split(/\r?\n/);
  let title = "Imported Song";
  let author = "Unknown";
  let originalKey = "C";
  let bpm: number | null = null;
  const textLines: string[] = [];

  for (const line of lines) {
    const metaMatch = line.match(/^\{(.*?):\s*(.*?)\}$/);
    if (metaMatch) {
      const [, key, value] = metaMatch;
      const normalized = key.toLowerCase();
      if (normalized === "title") {
        title = value;
      } else if (normalized === "artist") {
        author = value;
      } else if (normalized === "key") {
        originalKey = value;
      } else if (normalized === "tempo") {
        bpm = Number(value) || bpm;
      }
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
