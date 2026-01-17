import { Router } from "express";
import { getFavorites, replaceFavorites } from "./favoritesRepository";

const router = Router();

router.get("/:clientId", async (req, res, next) => {
  try {
    const data = await getFavorites(req.params.clientId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/:clientId", async (req, res, next) => {
  try {
    const payload = req.body as { songs?: string[]; chords?: string[] };
    const songs = Array.isArray(payload.songs) ? payload.songs : [];
    const chords = Array.isArray(payload.chords) ? payload.chords : [];
    await replaceFavorites(req.params.clientId, songs, chords);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
