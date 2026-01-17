import { extractChordsFromText } from "../parsing/extractChordsFromText";
import { transposeTextWithChords } from "../transposition/transposeTextWithChords";

const EASY_CHORDS = new Set([
  "C",
  "G",
  "D",
  "A",
  "E",
  "Am",
  "Em",
  "Dm",
  "A7",
  "D7",
  "E7",
  "G7"
]);

const BARRE_ROOTS = new Set(["F", "F#", "Gb", "B", "Bb", "A#"]);

type SimplifiedChord = {
  simplified: string;
  reason: string;
  changed: boolean;
};

export type BeginnerPlan = {
  transpose: number;
  simplifiedText: string;
  changes: {
    from: string;
    to: string;
    count: number;
    reason: string;
  }[];
  capoFret: number | null;
};

const splitChord = (chord: string): { root: string; suffix: string; bass: string | null } | null => {
  const [main, bass] = chord.split("/");
  const match = main.match(/^([A-G](#|b)?)(.*)$/);
  if (!match) {
    return null;
  }
  return { root: match[1], suffix: match[3], bass: bass ?? null };
};

const simplifyChord = (chord: string): SimplifiedChord => {
  const parts = splitChord(chord);
  if (!parts) {
    return { simplified: chord, reason: "Без изменений", changed: false };
  }

  const isMinor = parts.suffix.startsWith("m") && !parts.suffix.startsWith("maj");
  const simplified = `${parts.root}${isMinor ? "m" : ""}`;
  const reasons: string[] = [];

  if (parts.suffix && parts.suffix !== (isMinor ? "m" : "")) {
    reasons.push("Упрощена гармония");
  }
  if (parts.bass) {
    reasons.push("Убрана басовая нота");
  }

  return {
    simplified,
    reason: reasons.length > 0 ? reasons.join("; ") : "Без изменений",
    changed: simplified !== chord || Boolean(parts.bass)
  };
};

const difficultyScore = (chord: string): number => {
  if (EASY_CHORDS.has(chord)) {
    return 0;
  }
  const match = chord.match(/^([A-G](#|b)?)(.*)$/);
  if (!match) {
    return 3;
  }
  const root = match[1];
  const hasAccidental = root.includes("#") || root.includes("b");
  const isBarre = BARRE_ROOTS.has(root);
  return 2 + (hasAccidental ? 1 : 0) + (isBarre ? 2 : 0);
};

const simplifyText = (text: string): { text: string; changes: BeginnerPlan["changes"] } => {
  const changeMap = new Map<string, BeginnerPlan["changes"][number]>();
  const simplifiedText = text.replace(/\[([^\]]+)\]/g, (_match, chord) => {
    const simplified = simplifyChord(chord);
    if (simplified.simplified !== chord || simplified.changed) {
      const key = `${chord}→${simplified.simplified}`;
      const existing = changeMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        changeMap.set(key, {
          from: chord,
          to: simplified.simplified,
          count: 1,
          reason: simplified.reason
        });
      }
    }
    return `[${simplified.simplified}]`;
  });

  return { text: simplifiedText, changes: Array.from(changeMap.values()) };
};

const scoreTransposition = (text: string, semitones: number): number => {
  const transposed = transposeTextWithChords(text, semitones);
  const chords = extractChordsFromText(transposed);
  return chords.reduce((score, chord) => {
    const simplified = simplifyChord(chord).simplified;
    return score + difficultyScore(simplified);
  }, 0);
};

export const buildBeginnerPlan = (text: string): BeginnerPlan => {
  let bestTranspose = 0;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let semitones = -6; semitones <= 6; semitones += 1) {
    const score = scoreTransposition(text, semitones);
    if (score < bestScore) {
      bestScore = score;
      bestTranspose = semitones;
    }
  }

  const transposed = transposeTextWithChords(text, bestTranspose);
  const { text: simplifiedText, changes } = simplifyText(transposed);
  const capoFret = bestTranspose < 0 ? Math.abs(bestTranspose) : null;

  return {
    transpose: bestTranspose,
    simplifiedText,
    changes,
    capoFret
  };
};
