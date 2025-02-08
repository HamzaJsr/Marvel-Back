import express from "express";
import {
  getComics,
  getComicsByCharacterId,
  getComicById,
} from "../controllers/comicController.js";

const router = express.Router();

router.get("/comics", getComics);
router.get("/comics/:characterId", getComicsByCharacterId);
router.get("/comic/:comicId", getComicById);

export default router;
