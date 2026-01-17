import { describe, expect, it } from "vitest";
import { transposeTextWithChords } from "./transposeTextWithChords";

describe("transposeTextWithChords", () => {
  it("transposes simple chords by semitones", () => {
    const input = "[C]Hello [G]world";
    expect(transposeTextWithChords(input, 2)).toBe("[D]Hello [A]world");
  });

  it("keeps text outside brackets unchanged", () => {
    const input = "Text without chords";
    expect(transposeTextWithChords(input, 3)).toBe(input);
  });

  it("handles sharps and flats", () => {
    const input = "[Bb] [F#]";
    expect(transposeTextWithChords(input, 1)).toBe("[B] [G]");
  });

  it("transposes minor and slash chords", () => {
    const input = "[Am] [D/F#]";
    expect(transposeTextWithChords(input, -2)).toBe("[Gm] [C/E]");
  });
});
