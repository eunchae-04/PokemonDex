import React, { useState } from "react";
import { usePokemon } from "../context/PokemonContext";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  height: 280px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 12px;
  text-align: center;
  padding: 10px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.15);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const ModalImage = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  filter: drop-shadow(0 12px 30px rgba(15, 23, 42, 0.2));
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.isAdded ? "#e53935" : "#43a047")};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isAdded ? "#d32f2f" : "#38a344")};
  }
`;

export default function PokemonCard({ pokemon }) {
  const { myPokemons, addPokemon, removePokemon } = usePokemon();
  const isAdded = myPokemons.includes(pokemon.id);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddPokemon = (e) => {
    e.stopPropagation();
    addPokemon(pokemon.id);
  };

  const handleRemovePokemon = (e) => {
    e.stopPropagation();
    removePokemon(pokemon.id);
  };

  return (
    <>
      <CardContainer onClick={handleCardClick}>
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
                e.stopPropagation();
                handleRemovePokemon(e);
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
                e.stopPropagation();
                handleAddPokemon(e);
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
      </CardContainer>

      {/* 모달 */}
      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>✕</CloseButton>

            <div style={{ textAlign: "center" }}>
              <ModalImage
                src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />

              <h1 style={{ margin: "16px 0", fontSize: "32px" }}>
                {pokemon.name}
              </h1>

              <p style={{ margin: "8px 0", fontSize: "16px", color: "#666" }}>
                No. {String(pokemon.id).padStart(3, "0")}
              </p>

              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#e0e0e0",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  margin: "12px 0",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                타입: {pokemon.type}
              </div>

              <p
                style={{
                  margin: "20px 0",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#555",
                  minHeight: "60px",
                }}
              >
                {pokemon.description}
              </p>

              <ActionButton
                isAdded={isAdded}
                onClick={(e) => {
                  if (isAdded) {
                    handleRemovePokemon(e);
                  } else {
                    handleAddPokemon(e);
                  }
                }}
              >
                {isAdded ? "내 도감에서 제거" : "내 도감에 추가"}
              </ActionButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
