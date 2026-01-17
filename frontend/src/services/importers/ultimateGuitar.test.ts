import { describe, expect, it } from "vitest";
import { parseUltimateGuitar } from "./ultimateGuitar";

describe("parseUltimateGuitar", () => {
  it("parses headers and body", () => {
    const input = "Title: Song\nArtist: Band\nKey: G\nBPM: 90\n[C]Line";
    const result = parseUltimateGuitar(input);
    expect(result.title).toBe("Song");
    expect(result.author).toBe("Band");
    expect(result.originalKey).toBe("G");
    expect(result.bpm).toBe(90);
    expect(result.textWithChords).toContain("[C]Line");
  });
});
