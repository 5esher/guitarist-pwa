export type Song = {
  id: string;
  title: string;
  author: string;
  originalKey: string;
  bpm?: number | null;
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
