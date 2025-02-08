import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/favorites", addFavorite);
router.get("/favorites", getFavorites);
router.delete("/favorites/:id", removeFavorite);

export default router;
