// src/pages/PropDrillingApp.jsx
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import SelectedSlot from '../components/SelectedSlot';

export default function PropDrillingApp() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  // 포켓몬 데이터 불러오기
  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
      const data = await res.json();
      const results = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      setPokemons(results);
    };
    fetchPokemons();
  }, []);

  const handleSelect = (pokemon) => {
    if (selectedPokemons.some((p) => p.id === pokemon.id)) return;

    if (selectedPokemons.length >= 6) {
      alert('슬롯이 가득 찼습니다!');
      return;
    }

    setSelectedPokemons([...selectedPokemons, pokemon]);
  };

  const handleRemove = (pokemon) => {
    setSelectedPokemons(selectedPokemons.filter((p) => p.id !== pokemon.id));
  };

  return (
    <div>
      <SelectedSlot selectedPokemons={selectedPokemons} onRemove={handleRemove} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isSelected={selectedPokemons.some((p) => p.id === pokemon.id)}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
