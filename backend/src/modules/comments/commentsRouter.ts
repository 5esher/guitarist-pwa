import { Router } from "express";
import {
  addCommentVersion,
  createComment,
  getCommentsForSong,
  voteComment
} from "./commentsRepository";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const songId = req.query.songId;
    if (!songId || typeof songId !== "string") {
      res.status(400).json({ message: "songId is required" });
      return;
    }
    const comments = await getCommentsForSong(songId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { songId, clientId, body } = req.body as {
      songId?: string;
      clientId?: string;
      body?: string;
    };
    if (!songId || !clientId || !body) {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const commentId = await createComment(songId, clientId, body);
    res.status(201).json({ id: commentId });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/versions", async (req, res, next) => {
  try {
    const { body } = req.body as { body?: string };
    if (!body) {
      res.status(400).json({ message: "body is required" });
      return;
    }
    await addCommentVersion(req.params.id, body);
    res.status(201).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id/votes", async (req, res, next) => {
  try {
    const { clientId, vote } = req.body as { clientId?: string; vote?: number };
    if (!clientId || typeof vote !== "number") {
      res.status(400).json({ message: "Invalid payload" });
      return;
    }
    const normalized = Math.max(-1, Math.min(1, vote));
    await voteComment(req.params.id, clientId, normalized);
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

export default router;
