import React from "react";
import styled from "styled-components";

const Song = ({ currentSong }) => {
  return (
    <SongContainer>
      <Img src={currentSong[0].cover} alt={currentSong[0].name}></Img>
      <H2>{currentSong[0].name}</H2>
      <H2>{currentSong[0].artist}</H2>
    </SongContainer>
  );
};

const SongContainer = styled.div`
  margin-top: 10vh;
  min-height: 45vh;
  max-height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 5%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const H1 = styled.h2`
  padding: 3rem 1rem 1rem 1rem;
`;

const H2 = styled.h3`
  font-size: 1rem;
  color: white;
`;

export default Song;
