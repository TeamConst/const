// React
import { useRef, useState, useEffect, useCallback } from "react";

// React-hook-form
import { useForm } from "react-hook-form";

// React-query
import { useQuery } from "react-query";
import { fetchMusicTop100 } from "../../hooks";
import styled from "styled-components";
// axios
import axios from "axios";
const Wrap = styled.div`
  width: 960px;
  max-width: 100%;
  margin: 0 auto;
`;
const Header = styled.div`
  background: #555;
  box-shadow: 1px 2px 7px #333;
`;
const FramePosizione = styled.div`
  margin-left: 0px;
  margin-right: -1px;
  display: block;
`;
const Bottone = styled.div`
  height: 70px;
  width: 70px;
  background: #111;
  margin: 20px auto;
  border-radius: 100px;
`;
const Schermo = styled.div`
  height: 100%;
  width: 100%;
  background-color: #6666;
  opacity: 1;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
`;
const Microfono = styled.div`
  background: #111;
  height: 7px;
  width: 90px;
  margin: -19px auto 0;
  border-radius: 100px;
`;
const Sensore = styled.div`
  background: #111;
  height: 7px;
  width: 7px;
  margin: 12px 100px;

  border-radius: 100px;
  display: block;
`;
const Fotocamera = styled.div`
background: #111;
height: 7px;
width: 7px;
margin: auto;

border-radius: 100px;
display: block;
}
`;
const Dettaglio = styled.div`
  position: absolute;
  left: 0;
  top: 17px;
  width: 100%;
`;
const VolumeGiu = styled.div`
  height: 40px;
  width: 3px;
  left: -7px;
  top: 155px;
  border-radius: 4px 0 0 4px;

  width: 5px;
  background: #333;
  position: absolute;
`;
const VolumeSu = styled.div`
  height: 40px;
  width: 3px;
  left: -7px;
  top: 110px;
  border-radius: 4px 0 0 4px;

  width: 5px;
  background: #333;
  position: absolute;
`;
const AcenzioneButton = styled.div`
  background-color: #333;

  height: 15px;
  left: -5px;
  top: 59px;
  border-radius: 4px 0 0 4px;

  width: 3px;
  background: #333;
  position: absolute;
`;

const Smart = styled.div`
margin-left:auto;
  margin-right:auto;
  margin-top: 100px;;
	background-color: #333;

  border-radius:30px;

	width: 90%;
	height: 40%
	border-radius: 40px;
	border: 2px solid #ddd;
	margin: 0 auto;
	padding: 60px 10px;
	position: relative;


`;

const Boldtext = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const Smalltext = styled.div`
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const ProfileImg = styled.img`
  width: 10%;
  border-radius: 50%;
`;

// MUI - Component
import {
  Box,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material/";

// MUI - Style
import {  createTheme, ThemeProvider } from "@mui/material/styles";

import { v4 as uuidv4 } from "uuid";

import MusicPlayer from "../indexListenMusic/MusicPlayer";

const theme = createTheme();

const ListenMusic = () => {
  // const useUser1 = () => {
  //   const result = useQuery(["getMusicTop100"], () => fetchMusicTop100());
  //   return result;
  // };

  // const data1 = useUser1();

  // let a = 0;
  // let musicTop100;
  // if (data1.data) {
  //   a = 1;
  //   musicTop100 = data1.data.data;
  // }

  // let b = 0;
  // if (musicTop100) {
  //   for (let i = 0; i < musicTop100.length; i++) {
  //     musicTop100[i].rank = i + 1;
  //   }
  //   b = 1;
  // }

  const [차트, 차트변경] = useState([]);

  const sorting = async (data) => {
    if (data == "TOP100") {
      const result = await axios.get(
        "http://localhost:8080/api/getMusicTop100"
      );
      차트변경(result.data);
    } else {
      const result = await axios.post("http://localhost:8080/api/getMusic", {
        name: data,
      });

      차트변경(result.data);
    }
  };

  console.log(차트);
  // State
  const [songs, setSongs] = useState([
    {
      idCount: 0,
      name: `상태변수`,
      cover: "/img/ConstLogo.png",
      artist: "상태변수 팀 화이팅",
      audio: `https://ipfs.infura.io/ipfs/`,
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
  ]);

  const changeMusic = async (data) => {
    setSongs([
      {
        idCount: `${data.idCount}`,
        name: `${data.title}`,
        cover: `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.CID}.jpg`,
        artist: `${data.artist}`,
        audio: `https://ipfs.infura.io/ipfs/${data.CID}`,
        color: ["#EF8EA9", "#ab417f"],
        id: uuidv4(),
        active: false,
      },
    ]);
  };
 
  return (
    <div>
      <Box sx={{ m: 15 }}></Box>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={6} sx={{ pr: 10 }}>
            <Smart>
  <Dettaglio>
    <Sensore></Sensore>
    <Microfono></Microfono>
  </Dettaglio>
  <AcenzioneButton></AcenzioneButton>
  <VolumeSu></VolumeSu>
  <VolumeGiu></VolumeGiu>
  <Schermo>
  <MusicPlayer songs={songs} setSongs={setSongs}></MusicPlayer>
    <FramePosizione>
      <Header>
        <Wrap></Wrap>
      </Header>
    </FramePosizione>
  </Schermo>
  <Bottone></Bottone>
</Smart>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Box>
                <Button onClick={() => sorting("TOP100")}>TOP100</Button>
                <Button onClick={() => sorting("POP")}>POP</Button>
                <Button onClick={() => sorting("BALLAD")}>BALLAD</Button>
                <Button onClick={() => sorting("EDM")}>EDM</Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Table size="small" textAlign="center">
                  <TableHead>
                    <TableRow>
                      <TableCell>순위</TableCell>
                      <TableCell>이미지</TableCell>
                      <TableCell>노래제목</TableCell>
                      <TableCell>좋아요</TableCell>
                      <TableCell>Play</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody textAlign="center">
                    {차트.map((a, index) => (
                      <TableRow key={a.title}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img src={a.s3} width={"100px"}></img>
                        </TableCell>

                        <TableCell>{a.title}</TableCell>
                        <TableCell>{a.LikeMusic}</TableCell>
                        <TableCell
                          onClick={() => {
                            changeMusic(a);
                          }}
                        >
                          재생하기
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default ListenMusic;
