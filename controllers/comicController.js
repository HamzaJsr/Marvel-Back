import fetchFromMarvel from "../utils/utils.js";

const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

export const getComics = async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const skip = (page - 1) * limit;
    let title = req.query.title || "";

    const baseUrl = "https://lereacteur-marvel-api.herokuapp.com/comics";
    // decouverte de searchparams je ferais plus simple apres
    const params = new URLSearchParams({
      apiKey: MARVEL_API_KEY,
      limit: limit,
      skip: skip,
    });
    if (title) {
      params.append("title", title);
    }
    const finalUrl = `${baseUrl}?${params.toString()}`;
    const data = await fetchFromMarvel(finalUrl);
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des comics." });
  }
};

export const getComicsByCharacterId = async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${MARVEL_API_KEY}`;
    const data = await fetchFromMarvel(url);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des comics pour ce personnage.",
    });
  }
};

export const getComicById = async (req, res) => {
  const comicId = req.params.comicId;
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${MARVEL_API_KEY}`;
    const data = await fetchFromMarvel(url);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des informations du comic.",
    });
  }
};
