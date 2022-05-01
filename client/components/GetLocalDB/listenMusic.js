// React
import { useRef, useState, useEffect, useCallback } from "react";

// React-hook-form
import { useForm } from "react-hook-form";

// React-query
import { useQuery } from "react-query";
import { fetchMusicTop100 } from "../../hooks";

// axios
import axios from "axios";

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
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

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
        "http//54.227.126.254:8080/api/getMusicTop100"
      );
      차트변경(result.data);
    } else {
      const result = await axios.post("http//54.227.126.254:8080/api/getMusic", {
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
        <Container maxWidth="md">
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={6} sx={{ pr: 10 }}>
              <MusicPlayer songs={songs} setSongs={setSongs}></MusicPlayer>
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
