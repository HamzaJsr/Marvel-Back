const fetchFromMarvel = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erreur HTTP :", response.status, errorText);
    // pour le try catch
    throw new Error(`Erreur HTTP : ${response.status}`);
  }
  return response.json();
};

export default fetchFromMarvel;
