// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/pokemon-logo.webp";
import bgImage from "../assets/background.jpeg";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.2));
  backdrop-filter: blur(4px);
`;

const HeroCard = styled.div`
  position: relative;
  z-index: 1;
  width: min(720px, 92vw);
  padding: 48px 40px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  text-align: center;
`;

const Logo = styled.img`
  width: min(360px, 80vw);
  margin: 0 auto 20px;
  filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.2));
`;

const Title = styled.h1`
  font-size: clamp(26px, 4vw, 34px);
  margin: 0 0 10px;
  color: #0f172a;
`;

const Subtitle = styled.p`
  margin: 0 0 28px;
  color: #475569;
  font-size: 16px;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 14px 34px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(239, 68, 68, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(239, 68, 68, 0.4);
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dex");
  };

  return (
    <Container>
      <Overlay />
      <HeroCard>
        <Logo src={logo} alt="Pokemon Logo" />
        <Title>세상에서 가장 멋진 포켓몬 도감</Title>
        <Subtitle>포켓몬을 모으고, 상세 정보를 확인하며 나만의 팀을 완성해보세요.</Subtitle>
        <StartButton onClick={handleStart}>포켓몬 도감 시작하기</StartButton>
      </HeroCard>
    </Container>
  );
};

export default Home;
