import User from "../models/User.js";

export const addFavorite = async (req, res) => {
  try {
    const { type, id } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    if (type === "character" && !user.favorites.characters.includes(id)) {
      user.favorites.characters.push(id);
    } else if (type === "comic" && !user.favorites.comics.includes(id)) {
      user.favorites.comics.push(id);
    } else {
      return res.status(400).json({ error: "Déjà en favoris" });
    }

    await user.save();
    res.json({ message: "Ajouté aux favoris !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);

    user.favorites.characters = user.favorites.characters.filter(
      (fav) => fav !== id
    );
    user.favorites.comics = user.favorites.comics.filter((fav) => fav !== id);

    await user.save();
    res.json({ message: "Supprimé des favoris" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
