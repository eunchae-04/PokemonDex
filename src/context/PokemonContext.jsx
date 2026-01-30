import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [myPokemons, setMyPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);

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
    <PokemonContext.Provider value={{ myPokemons, addPokemon, removePokemon, pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
