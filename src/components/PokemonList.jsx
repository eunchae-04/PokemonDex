// src/components/PokemonList.jsx
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { usePokemon } from "../context/PokemonContext";

export default function PokemonList() {
  const { pokemons, setPokemons } = usePokemon();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 이미 포켓몬 데이터가 있으면 로드하지 않음
    if (pokemons.length > 0) {
      setLoading(false);
      return;
    }

    const fetchPokemons = async () => {
      try {
        console.log("포켓몬 API 호출 시작...");
        // 첫 번째 100개의 포켓몬 데이터 가져오기
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();
        console.log("API 응답 받음:", data);

        // 각 포켓몬의 상세 정보 가져오기
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              type: pokemonData.types.map((t) => t.type.name).join(", "),
              description: `${pokemonData.name} 포켓몬`,
              image: pokemonData.sprites.front_default,
            };
          })
        );

        console.log("포켓몬 데이터 변환 완료:", detailedPokemons);
        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("포켓몬 데이터를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>로딩 중...</div>;
  }

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
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
