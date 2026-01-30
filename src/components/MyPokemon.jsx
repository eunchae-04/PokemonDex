// src/components/MyPokemon.jsx
import React from "react";
import { usePokemon } from "../context/PokemonContext";

export default function MyPokemon() {
  const { myPokemons, removePokemon, pokemons } = usePokemon();

  return (
    <div style={{ display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "16px",
      marginTop: "12px", }}>
      {[...Array(6)].map((_, i) => {
        const pokemonId = myPokemons[i];
        const pokemon = pokemons.find((p) => p.id === pokemonId);

        return (
          <div
            key={i}
            style={{
              width: "100%",
              height: 280,
              border: "1px solid rgba(148, 163, 184, 0.35)",
              borderRadius: "12px",
              textAlign: "center",
              padding: "10px",
              background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
            }}
          >
            {pokemon ? (
              <>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  style={{ width: 150, height: 170 }}
                />
                <div style={{ marginTop: 8 }}>
                  <strong>{pokemon.name}</strong>
                  <p style={{ margin: "4px 0", fontSize: "1px" }}>
                    No. {String(pokemon.id).padStart(3, "0")}
                  </p>
                  <button
                    onClick={() => removePokemon(pokemon.id)}
                    style={{
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                  border: "2px dashed rgba(148, 163, 184, 0.5)",
                  borderRadius: "10px",
                }}
              >
                빈 슬롯
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
