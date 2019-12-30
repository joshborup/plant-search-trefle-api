import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Species(props) {
  const [species, setSpecies] = useState([]);
  const [individual, setIndividual] = useState(null);

  const [page, setPage] = useState(1);
  async function allSpeciesGrabber() {
    const fetchedSpecies = await axios.get(`/api/all_species/${page}`);
    console.log(fetchedSpecies.data);
    setSpecies(fetchedSpecies.data);
  }

  async function individualSpeciesGrabber(id) {
    const fetchedSpecies = await axios.get(`/api/species/${id}`);
    console.log(fetchedSpecies.data);
    setIndividual(fetchedSpecies.data);
  }

  function pageChange(direction) {
    if (direction === "back" && page >= 2) {
      setPage(page - 1);
    } else if (direction === "forward" && page >= 1) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    allSpeciesGrabber();
    //dont need species grabber as dependency regardless of es-lint rule (this causes constant re-render)
    // eslint-disable-next-line
  }, [page]);

  const mappedSpecies = species.map(spec => {
    return (
      <div
        style={{ backgroundColor: spec.complete_data ? "green" : "red" }}
        key={spec.id}
      >
        <div>{spec.slug}</div>
        <button onClick={() => individualSpeciesGrabber(spec.id)}>
          Learn More
        </button>
      </div>
    );
  });

  const parsedIndividual = individual ? (
    <div>
      <h1>{individual.slug}</h1>
      {individual.images[0] && (
        <img src={individual.images[0].url} alt={individual.slug} />
      )}
      <button onClick={() => setIndividual(null)}>Back</button>
    </div>
  ) : null;
  return (
    <div>
      <div>{individual ? parsedIndividual : mappedSpecies}</div>
      {!individual && (
        <div>
          <button onClick={() => pageChange("back")}>Back</button>
          <button onClick={() => pageChange("forward")}>Next</button>
        </div>
      )}
    </div>
  );
}
