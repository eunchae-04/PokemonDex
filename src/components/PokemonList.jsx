import React from "react";
import pokemons from "../data/pokemons";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ myPokemons, addPokemon, removePokemon }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "12px",
        marginTop: "20px",
      }}
    >
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          myPokemons={myPokemons}
          addPokemon={addPokemon}
          removePokemon={removePokemon}
        />
      ))}
    </div>
  );
}
