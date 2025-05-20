// src/pages/Dex.jsx
import React from "react";
import MyPokemon from "../components/MyPokemon";
import PokemonList from "../components/PokemonList";

export default function Dex() {
  return (
    <div style={{ padding: "20px" }}>
      <section style={{
        backgroundColor: "#9acd32",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "24px",
          marginBottom: "16px",
          borderBottom: "2px solid #ccc",
          paddingBottom: "8px"
        }}>
          나만의 포켓몬
        </h1>
        <MyPokemon />
      </section>

      <section>
        <h1 style={{
          fontSize: "24px",
          marginBottom: "16px",
          borderBottom: "2px solid #ccc",
          paddingBottom: "8px"
        }}>
          포켓몬 도감
        </h1>
        <PokemonList />
      </section>
    </div>
  );
}
