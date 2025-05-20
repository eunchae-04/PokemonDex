// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/pokemon-logo.webp";
import bgImage from "../assets/background.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  backdrop-filter: blur(2px);
`;

const Logo = styled.img`
  width: 360px;
  margin-bottom: 30px;
`;

const StartButton = styled.button`
  background-color: #e53935;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dex");
  };

  return (
    <Container>
      <Logo src={logo} alt="Pokemon Logo" />
      <StartButton onClick={handleStart}>포켓몬 도감 시작하기</StartButton>
    </Container>
  );
};

export default Home;
