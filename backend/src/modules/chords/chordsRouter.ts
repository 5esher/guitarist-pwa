import { Router } from "express";
import { createChord, getChordByName, getChords, updateChord } from "./chordsRepository";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const chords = await getChords();
    res.json(chords);
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const chord = await getChordByName(req.params.name);
    if (!chord) {
      res.status(404).json({ message: "Chord not found" });
      return;
    }
    res.json(chord);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, fingering } = req.body as { name?: string; fingering?: unknown };
    if (!name || typeof name !== "string") {
      res.status(400).json({ message: "Invalid chord name" });
      return;
    }
    const created = await createChord(name, fingering ?? {});
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/:name", async (req, res, next) => {
  try {
    const updated = await updateChord(req.params.name, req.body?.fingering ?? {});
    if (!updated) {
      res.status(404).json({ message: "Chord not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
