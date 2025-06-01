//src/pages/Detail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import pokemons from "../data/pokemons";
import { usePokemon } from "../context/PokemonContext"; 

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myPokemons, addPokemon, removePokemon } = usePokemon(); 
  const pokemon = pokemons.find((p) => p.id === Number(id));

  if (!pokemon) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        포켓몬을 찾을 수 없습니다.
      </div>
    );
  }

  const isAdded = myPokemons.includes(pokemon.id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: 200, height: 200 }}
      />
      <p>
        <strong>타입: </strong>
        {pokemon.type}
      </p>
      <p>{pokemon.description}</p>

      {isAdded ? (
        <button
          onClick={() => removePokemon(pokemon.id)}
          style={{
            marginTop: "20px",
            backgroundColor: "#e53935",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          삭제
        </button>
      ) : (
        <button
          onClick={() => addPokemon(pokemon.id)}
          style={{
            marginTop: "20px",
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          추가
        </button>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "12px",
          backgroundColor: "#777",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
}
