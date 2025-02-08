import fetchFromMarvel from "../utils/utils.js";
const MARVEL_API_KEY = process.env.MARVEL_API_KEY;

export const getCharacters = async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const skip = (page - 1) * limit;
    const name = req.query.name ? req.query.name : "";

    let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${MARVEL_API_KEY}&limit=${limit}&skip=${skip}`;
    if (name) {
      url += `&name=${name}`;
    }

    const data = await fetchFromMarvel(url);
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des personnages." });
  }
};

export const getCharacterById = async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const url = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${MARVEL_API_KEY}`;
    const data = await fetchFromMarvel(url);
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du personnage." });
  }
};
