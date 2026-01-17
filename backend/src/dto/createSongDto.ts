export type CreateSongDto = {
  title: string;
  author: string;
  originalKey: string;
  bpm?: number;
  textTabs?: string;
  strumPattern?: string;
  textWithChords: string;
};
