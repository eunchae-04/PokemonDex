// src/components/PokemonList.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import { usePokemon } from "../context/PokemonContext";

export default function PokemonList() {
  const { pokemons, setPokemons } = usePokemon();
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const observerTarget = useRef(null);

  // 포켓몬 데이터 가져오기 (초기 48개 또는 추가 24개)
  const fetchMorePokemons = useCallback(async (currentOffset, limit) => {
    try {
      setLoadingMore(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`
      );
      const data = await response.json();

      // 각 포켓몬의 상세 정보 가져오기
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();

          // 포켓몬 종 정보에서 설명 가져오기
          let description = `${pokemonData.name} 포켓몬`;
          try {
            const speciesResponse = await fetch(pokemonData.species.url);
            const speciesData = await speciesResponse.json();
            
            // 한국어 설명 찾기
            const koreanEntry = speciesData.flavor_text_entries?.find(
              (entry) => entry.language.name === "ko"
            );
            if (koreanEntry) {
              description = koreanEntry.flavor_text.replace(/[\n\f]/g, " ");
            }

            // 한국어 이름 찾기
            const koreanName = speciesData.names?.find(
              (name) => name.language.name === "ko"
            );
            if (koreanName?.name) {
              pokemonData.name = koreanName.name;
            }
          } catch (error) {
            console.error("포켓몬 설명 로드 실패:", error);
          }

          return {
            id: pokemonData.id,
            name: pokemonData.name,
            type: pokemonData.types.map((t) => t.type.name).join(", "),
            description: description,
            image: pokemonData.sprites.front_default,
          };
        })
      );

      return detailedPokemons;
    } catch (error) {
      console.error("포켓몬 데이터를 가져오는데 실패했습니다:", error);
      return [];
    } finally {
      setLoadingMore(false);
    }
  }, []);

  // 초기 로드 (48개)
  useEffect(() => {
    const loadInitialPokemons = async () => {
      setLoading(true);
      const data = await fetchMorePokemons(0, 48);
      setDisplayedPokemons(data);
      setPokemons(data);
      setOffset(48);
      setLoading(false);
    };

    if (pokemons.length === 0) {
      loadInitialPokemons();
    } else {
      setDisplayedPokemons(pokemons);
    }
  }, []);

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading) {
          const newData = await fetchMorePokemons(offset, 24);
          setDisplayedPokemons((prev) => [...prev, ...newData]);
          setPokemons((prev) => [...prev, ...newData]); // Context도 함께 업데이트
          setOffset((prev) => prev + 24);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadingMore, loading, offset, fetchMorePokemons]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>로딩 중...</div>;
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        {displayedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {/* 무한 스크롤 트리거 */}
      <div
        ref={observerTarget}
        style={{
          textAlign: "center",
          padding: "40px 20px",
          marginTop: "40px",
        }}
      >
        {loadingMore && <div>추가 포켓몬 로딩 중...</div>}
      </div>
    </>
  );
}
