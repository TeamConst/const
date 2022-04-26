import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { v4 as uuidv4 } from "uuid";
// Import components
import Player from "./Player";
import Song from "./Song";

const MusicPlayer = ({ str ,title}) => {
  const str2 = str;
  const title2 = title;
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState([
    {
      name: `${title2}`,
      cover: `https://const123.s3.ap-northeast-2.amazonaws.com/image/${str2}.jpg`,
      artist: "Aiguille",
      audio: `https://ipfs.io/ipfs/${str}`,
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
  ]);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  console.log("여기영");

  console.log(str2);

  useEffect(() => {
    console.log("hihi");
    setSongs([
      {
        name: `${str2}`,
        cover: `https://const123.s3.ap-northeast-2.amazonaws.com/image/${str2}.jpg`,
        artist: "Aiguille",
        audio: `https://ipfs.io/ipfs/${str}`,
        color: ["#EF8EA9", "#ab417f"],
        id: uuidv4(),
        active: false,
      },
    ]);
    setCurrentSong(songs[0]);
  }, [str]);

  console.log(songs);

  // Functions
  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length];
    await setCurrentSong(nextSong);

    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <AppContainer libraryStatus={libraryStatus}>
      {/* <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} /> */}
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export default MusicPlayer;
