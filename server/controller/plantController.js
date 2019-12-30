const axios = require("axios");
const { PLANT_TOKEN } = process.env;
module.exports = {
  getAllSpecies: async (req, res, next) => {
    const { page } = req.params;
    console.log(page);
    var plants = await axios.get(
      `https://trefle.io/api/species?page=${page}&token=${PLANT_TOKEN}`
    );

    res.status(200).send(plants.data);
  },
  getIndividualSpecies: async (req, res, next) => {
    const { id } = req.params;
    var plants = await axios.get(
      `https://trefle.io/api/species/${id}?token=${PLANT_TOKEN}`
    );
    console.log(plants);
    console.log(id);
    res.status(200).send(plants.data);
  }
};
