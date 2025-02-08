import express from "express";
import {
  getCharacters,
  getCharacterById,
} from "../controllers/characterController.js";

const router = express.Router();

router.get("/characters", getCharacters);
router.get("/character/:characterId", getCharacterById);

export default router;
