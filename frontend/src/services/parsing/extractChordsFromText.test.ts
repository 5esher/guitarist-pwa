import { describe, expect, it } from "vitest";
import { extractChordsFromText } from "./extractChordsFromText";

describe("extractChordsFromText", () => {
  it("returns unique chords in order of appearance", () => {
    const input = "[C]Hello [G]world [C]again";
    expect(extractChordsFromText(input)).toEqual(["C", "G"]);
  });

  it("returns empty array when no chords", () => {
    expect(extractChordsFromText("Plain text")).toEqual([]);
  });
});
