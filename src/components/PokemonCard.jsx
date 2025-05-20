import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";

export default function PokemonCard({ pokemon }) {
  const { myPokemons, addPokemon, removePokemon } = usePokemon();
  const isAdded = myPokemons.includes(pokemon.id);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${pokemon.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        width: 200,
        height: 280,
        border: "1px solid #ccc",
        borderRadius: "12px",
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        style={{ width: 150, height: 170 }}
      />
      <div style={{ marginTop: 8 }}>
        <strong style={{ fontSize: "15px" }}>{pokemon.name}</strong>
        <p style={{ margin: "4px 0", fontSize: "15px" }}>
          No. {String(pokemon.id).padStart(3, "0")}
        </p>

        {isAdded ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 막기
              removePokemon(pokemon.id);
            }}
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
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 막기
              addPokemon(pokemon.id);
            }}
            style={{
              backgroundColor: "#43a047",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            추가
          </button>
        )}
      </div>
    </div>
  );
}
