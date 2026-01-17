export type Song = {
  id: string;
  title: string;
  author: string;
  originalKey: string;
  bpm?: number | null;
  textWithChords: string;
};
