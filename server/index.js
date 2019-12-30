require("dotenv").config();
const express = require("express");
const app = express();
const {
  getAllSpecies,
  getIndividualSpecies
} = require("./controller/plantController");
app.use(express.json());

app.get("/api/all_species/:page", getAllSpecies);
app.get("/api/species/:id", getIndividualSpecies);

const port = 4000;
app.listen(port, () => console.log(`server listening on port ${port}`));
