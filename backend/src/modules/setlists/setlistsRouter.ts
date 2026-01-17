import { Router } from "express";
import {
  createSetlist,
  getSetlistById,
  getSetlists,
  SetlistItemInput,
  updateSetlist
} from "./setlistsRepository";

const router = Router();

const parseItems = (items: unknown): SetlistItemInput[] | null => {
  if (!Array.isArray(items)) {
    return null;
  }
  const parsed: SetlistItemInput[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") {
      return null;
    }
    const record = item as Record<string, unknown>;
    if (
      typeof record.songId !== "string" ||
      typeof record.position !== "number" ||
      typeof record.durationSeconds !== "number"
    ) {
      return null;
    }
    parsed.push({
      songId: record.songId,
      position: record.position,
      durationSeconds: record.durationSeconds
    });
  }
  return parsed;
};

router.get("/", async (req, res, next) => {
  try {
    const clientId = req.query.clientId;
    if (!clientId || typeof clientId !== "string") {
      res.status(400).json({ message: "clientId is required" });
      return;
    }
    const setlists = await getSetlists(clientId);
    res.json(setlists);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const setlist = await getSetlistById(req.params.id);
    if (!setlist) {
      res.status(404).json({ message: "Setlist not found" });
      return;
    }
    res.json(setlist);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { clientId, title, items } = req.body as {
      clientId?: string;
      title?: string;
      items?: unknown;
    };
    if (!clientId || typeof clientId !== "string" || !title || typeof title !== "string") {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const parsedItems = parseItems(items ?? []);
    if (!parsedItems) {
      res.status(400).json({ message: "Invalid items" });
      return;
    }
    const setlist = await createSetlist(clientId, title, parsedItems);
    res.status(201).json(setlist);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, items } = req.body as {
      title?: string;
      items?: unknown;
    };
    if (!title || typeof title !== "string") {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const parsedItems = parseItems(items ?? []);
    if (!parsedItems) {
      res.status(400).json({ message: "Invalid items" });
      return;
    }
    const setlist = await updateSetlist(req.params.id, title, parsedItems);
    if (!setlist) {
      res.status(404).json({ message: "Setlist not found" });
      return;
    }
    res.json(setlist);
  } catch (error) {
    next(error);
  }
});

export default router;
