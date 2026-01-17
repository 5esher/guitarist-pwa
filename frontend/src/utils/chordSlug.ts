export const chordSlug = (chord: string) => {
  return chord.replace(/#/g, "sharp").replace(/b/g, "flat");
};
