import { Router } from "express";
import { createSong, createSongs, getSongById, getSongs } from "./songsRepository";
import { CreateSongDto } from "../../dto/createSongDto";
import { ImportSongsDto } from "../../dto/importSongsDto";

const router = Router();

const isCreateSongDto = (payload: unknown): payload is CreateSongDto => {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const record = payload as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.author === "string" &&
    typeof record.originalKey === "string" &&
    typeof record.textWithChords === "string" &&
    (record.bpm === undefined || typeof record.bpm === "number")
  );
};

router.get("/", async (_req, res, next) => {
  try {
    const songs = await getSongs();
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const song = await getSongById(req.params.id);
    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    if (!isCreateSongDto(payload)) {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const song = await createSong(payload);
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
});

router.post("/import", async (req, res, next) => {
  try {
    const payload = req.body as ImportSongsDto;
    if (!payload || !Array.isArray(payload.songs) || !payload.songs.every(isCreateSongDto)) {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const songs = await createSongs(payload.songs);
    res.status(201).json({ songs });
  } catch (error) {
    next(error);
  }
});

export default router;
