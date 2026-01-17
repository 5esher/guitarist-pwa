export type Song = {
  id: string;
  title: string;
  author: string;
  originalKey: string;
  bpm?: number | null;
  textTabs?: string | null;
  strumPattern?: string | null;
  textWithChords: string;
};
