import { describe, expect, it } from "vitest";
import { parseSongText } from "./parseSongText";

describe("parseSongText", () => {
  it("splits lines into segments with global positions", () => {
    const input = "[C]Hello\n[G]World";
    const result = parseSongText(input);

    expect(result.lines).toHaveLength(2);
    expect(result.lines[0].segments).toEqual([
      { type: "chord", value: "C", position: 0 },
      { type: "text", value: "Hello", position: 3 }
    ]);
    expect(result.lines[1].segments).toEqual([
      { type: "chord", value: "G", position: 9 },
      { type: "text", value: "World", position: 12 }
    ]);
  });

  it("keeps text segments when no chords present", () => {
    const input = "Plain line";
    const result = parseSongText(input);

    expect(result.lines[0].segments).toEqual([
      { type: "text", value: "Plain line", position: 0 }
    ]);
  });
});
