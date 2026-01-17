import express from "express";
import songsRouter from "./modules/songs/songsRouter";
import chordsRouter from "./modules/chords/chordsRouter";
import favoritesRouter from "./modules/favorites/favoritesRouter";
import profilesRouter from "./modules/profiles/profilesRouter";
import setlistsRouter from "./modules/setlists/setlistsRouter";
import commentsRouter from "./modules/comments/commentsRouter";
import { config } from "./config";
import { initDb } from "./db";

const app = express();

app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (_req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/songs", songsRouter);
app.use("/chords", chordsRouter);
app.use("/favorites", favoritesRouter);
app.use("/profiles", profilesRouter);
app.use("/setlists", setlistsRouter);
app.use("/comments", commentsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const start = async () => {
  await initDb();
  app.listen(config.port, () => {
    console.log(`Backend listening on http://localhost:${config.port}`);
  });
};

start();
