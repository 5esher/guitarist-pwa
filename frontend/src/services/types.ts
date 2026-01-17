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

export type ChordVariant = {
  type: string;
  src: string;
};

export type Chord = {
  id: string;
  name: string;
  fingering: {
    type: string;
    src: string;
    variants?: ChordVariant[];
  };
};

export type UserProfile = {
  clientId: string;
  displayName: string;
  instrument: string;
};

export type SetlistItem = {
  id: string;
  songId: string;
  position: number;
  durationSeconds: number;
  title: string;
  author: string;
};

export type Setlist = {
  id: string;
  clientId: string;
  title: string;
  items: SetlistItem[];
};

export type CommentVersion = {
  id: string;
  body: string;
  createdAt: string;
};

export type SongComment = {
  id: string;
  songId: string;
  clientId: string;
  createdAt: string;
  body: string;
  votes: number;
  versions: CommentVersion[];
};
