export const extractChordsFromText = (text: string): string[] => {
  const matches = [...text.matchAll(/\[([^\]]+)\]/g)];
  const seen = new Set<string>();
  const result: string[] = [];

  for (const match of matches) {
    const chord = match[1];
    if (!seen.has(chord)) {
      seen.add(chord);
      result.push(chord);
    }
  }

  return result;
};
