import React from "react";
import pokemons from "../data/pokemons";

export default function MyPokemon({ myPokemons, removePokemon }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "12px",
        marginTop: "20px",
      }}
    >
      {[...Array(6)].map((_, i) => {
        const pokemonId = myPokemons[i];
        const pokemon = pokemons.find((p) => p.id === pokemonId);

        return (
          <div
            key={i}
            style={{
              width: 200,
              height: 280,
              border: "1px solid #ccc",
              borderRadius: "12px",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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
                  color: "#999",
                  fontSize: "14px",
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
