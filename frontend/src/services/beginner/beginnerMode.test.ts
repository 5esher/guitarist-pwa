import { describe, expect, it } from "vitest";
import { buildBeginnerPlan } from "./beginnerMode";

describe("beginner mode", () => {
  it("simplifies complex chords and suggests capo", () => {
    const text = "[F#m7]Verse [C#]line [G#m7]end";
    const plan = buildBeginnerPlan(text);

    expect(plan.simplifiedText).toContain("[Em]");
    expect(plan.simplifiedText).toContain("[A]");
    expect(plan.simplifiedText).toContain("[F#m]");
    expect(plan.changes.length).toBeGreaterThan(0);
    expect(plan.transpose).not.toBe(0);
  });
});
