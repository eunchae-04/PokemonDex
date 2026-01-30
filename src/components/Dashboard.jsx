//src/components/Dashboard.jsx
import React from "react";
import { usePokemon } from "../context/PokemonContext";

export default function Dashboard() {
  const { myPokemons, pokemons } = usePokemon();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[...Array(5)].map((_, i) => {
        const pokemonId = myPokemons[i];
        const pokemon = pokemons.find((p) => p.id === pokemonId);
        return (
          <div
            key={i}
            style={{
              width: 80,
              height: 100,
              border: "1px dashed gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pokemon ? pokemon.name : "빈 슬롯"}
          </div>
        );
      })}
    </div>
  );
}
