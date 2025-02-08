import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import characterRoutes from "./routes/characterRoutes.js";
import comicRoutes from "./routes/comicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

// /api/auth/register et /api/auth/login
app.use("/api/auth", authRoutes);

app.use("/api", authMiddleware, characterRoutes);
app.use("/api", authMiddleware, comicRoutes);

app.use("/api", authMiddleware, favoriteRoutes);

// app.get("/api/characters", async (req, res) => {
//   try {
//     const page = req.query.page ? Number(req.query.page) : 1;
//     const limit = req.query.limit ? Number(req.query.limit) : 100;
//     const skip = (page - 1) * limit;
//     const name = req.query.name ? req.query.name : "";

//     let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_KEY}&limit=${limit}&skip=${skip}`;
//     if (name) {
//       url += `&name=${name}`;
//     }

//     const data = await fetchFromMarvel(url);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la récupération des personnages." });
//   }
// });

// app.get("/api/character/:characterId", async (req, res) => {
//   const characterId = req.params.characterId;
//   try {
//     const url = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${MARVEL_API_KEY}`;
//     const data = await fetchFromMarvel(url);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la récupération du personnage." });
//   }
// });

// app.get("/api/comics", async (req, res) => {
//   try {
//     const page = req.query.page ? Number(req.query.page) : 1;
//     const limit = req.query.limit ? Number(req.query.limit) : 100;
//     const skip = (page - 1) * limit;
//     let title = req.query.title || "";

//     const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/comics";
//     const params = new URLSearchParams({
//       apiKey: MARVEL_API_KEY,
//       limit: limit,
//       skip: skip,
//     });
//     if (title) {
//       params.append("title", title);
//     }
//     const finalUrl = `${baseUrl}?${params.toString()}`;
//     const data = await fetchFromMarvel(finalUrl);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la récupération des comics." });
//   }
// });

// app.get("/api/comics/:characterId", async (req, res) => {
//   const characterId = req.params.characterId;
//   try {
//     const url = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${MARVEL_API_KEY}`;
//     const data = await fetchFromMarvel(url);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Erreur lors de la récupération des comics pour ce personnage.",
//     });
//   }
// });

// app.get("/api/comic/:comicId", async (req, res) => {
//   const comicId = req.params.comicId;
//   try {
//     const url = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${MARVEL_API_KEY}`;
//     const data = await fetchFromMarvel(url);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Erreur lors de la récupération des informations du comic.",
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});
