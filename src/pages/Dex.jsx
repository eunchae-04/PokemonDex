// src/pages/Dex.jsx
import React, { useState } from "react";
import MyPokemon from "../components/MyPokemon";
import PokemonList from "../components/PokemonList";
import { toast } from "react-toastify";

export default function Dex() {
  const [myPokemons, setMyPokemons] = useState([]);

  const addPokemon = (id) => {
    if (myPokemons.includes(id)) return;
    if (myPokemons.length >= 6) {
      toast.error("최대 6마리까지 등록할 수 있습니다!");
      return;
    }
    setMyPokemons([...myPokemons, id]);
    toast.success("포켓몬이 추가되었습니다!");
  };

  const removePokemon = (id) => {
    setMyPokemons(myPokemons.filter((pid) => pid !== id));
    toast.info("포켓몬이 제거되었습니다.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <section
        style={{
          backgroundColor: "#9acd32",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "16px",
            borderBottom: "2px solid #ccc",
            paddingBottom: "8px",
          }}
        >
          나만의 포켓몬
        </h1>
        <MyPokemon
          myPokemons={myPokemons}
          removePokemon={removePokemon}
        />
      </section>

      <section>
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "16px",
            borderBottom: "2px solid #ccc",
            paddingBottom: "8px",
          }}
        >
          포켓몬 도감
        </h1>
        <PokemonList
          myPokemons={myPokemons}
          addPokemon={addPokemon}
          removePokemon={removePokemon}
        />
      </section>
    </div>
  );
}
