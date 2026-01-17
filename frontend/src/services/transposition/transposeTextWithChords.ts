const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
const FLAT_TO_SHARP: Record<string, typeof NOTES[number]> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#"
};

const normalizeNote = (note: string): typeof NOTES[number] | null => {
  if (NOTES.includes(note as typeof NOTES[number])) {
    return note as typeof NOTES[number];
  }
  if (note in FLAT_TO_SHARP) {
    return FLAT_TO_SHARP[note];
  }
  return null;
};

const transposeNote = (note: string, semitones: number): string => {
  const normalized = normalizeNote(note);
  if (!normalized) {
    return note;
  }
  const index = NOTES.indexOf(normalized);
  const nextIndex = (index + semitones + NOTES.length) % NOTES.length;
  return NOTES[nextIndex];
};

const splitChord = (chord: string): { root: string; suffix: string } | null => {
  const match = chord.match(/^([A-G](#|b)?)(.*)$/);
  if (!match) {
    return null;
  }
  return { root: match[1], suffix: match[3] };
};

const transposeChord = (chord: string, semitones: number): string => {
  const [main, bass] = chord.split("/");
  const mainParts = splitChord(main);
  if (!mainParts) {
    return chord;
  }
  const transposedMain = `${transposeNote(mainParts.root, semitones)}${mainParts.suffix}`;
  if (!bass) {
    return transposedMain;
  }
  const bassParts = splitChord(bass);
  if (!bassParts) {
    return `${transposedMain}/${bass}`;
  }
  const transposedBass = `${transposeNote(bassParts.root, semitones)}${bassParts.suffix}`;
  return `${transposedMain}/${transposedBass}`;
};

export const transposeTextWithChords = (text: string, semitones: number): string => {
  return text.replace(/\[([^\]]+)\]/g, (_match, chord) => {
    return `[${transposeChord(chord, semitones)}]`;
  });
};
