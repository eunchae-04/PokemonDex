// src/pages/Dex.jsx
import React from "react";
import styled from "styled-components";
import MyPokemon from "../components/MyPokemon";
import PokemonList from "../components/PokemonList";

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.4);
  padding-bottom: 12px;
`;

const SectionTitle = styled.h1`
  font-size: 22px;
  margin: 0;
  color: #0f172a;
`;

const SectionHint = styled.span`
  font-size: 13px;
  color: #64748b;
`;

export default function Dex() {
  return (
    <Page>
      <Section>
        <SectionHeader>
          <SectionTitle>나만의 포켓몬</SectionTitle>
          <SectionHint>최대 6마리까지 등록할 수 있어요</SectionHint>
        </SectionHeader>
        <MyPokemon />
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>포켓몬 도감</SectionTitle>
          <SectionHint>카드를 클릭하면 상세 정보를 확인할 수 있어요</SectionHint>
        </SectionHeader>
        <PokemonList />
      </Section>
    </Page>
  );
}
