import { describe, expect, it } from "vitest";
import { parseChordPro } from "./chordPro";

describe("parseChordPro", () => {
  it("parses metadata and song body", () => {
    const input = "{title: Test}\n{artist: Artist}\n{key: D}\n{tempo: 120}\n[C]Line";
    const result = parseChordPro(input);
    expect(result.title).toBe("Test");
    expect(result.author).toBe("Artist");
    expect(result.originalKey).toBe("D");
    expect(result.bpm).toBe(120);
    expect(result.textWithChords).toContain("[C]Line");
  });
});
