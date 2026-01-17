export type CreateSongDto = {
  title: string;
  author: string;
  originalKey: string;
  bpm?: number;
  textWithChords: string;
};
