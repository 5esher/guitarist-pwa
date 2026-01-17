import { Router } from "express";
import { getProfile, upsertProfile } from "./profilesRepository";

const router = Router();

router.get("/:clientId", async (req, res, next) => {
  try {
    const profile = await getProfile(req.params.clientId);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.put("/:clientId", async (req, res, next) => {
  try {
    const { displayName, instrument } = req.body as {
      displayName?: string;
      instrument?: string;
    };
    if (!displayName || typeof displayName !== "string") {
      res.status(400).json({ message: "displayName is required" });
      return;
    }
    const profile = await upsertProfile(
      req.params.clientId,
      displayName,
      typeof instrument === "string" ? instrument : "guitar"
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

export default router;
