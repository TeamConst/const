// React
import { useRef, useState, useEffect } from "react";

// React-hook-form
import { useForm } from "react-hook-form";

// React-query
import { useQuery } from "react-query";
import { fetchMusics } from "../../hooks";

// axios
import axios from "axios";

// MUI - Component
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material/";

// MUI - Style
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import MusicPlayer from "../Musicplay/MusicPlayer";

const theme = createTheme();

const ListenMusic = () => {
  const { data, isLoading, isFetching } = useQuery(["musics"], () =>
    fetchMusics()
  );

  let musics;
  let a = 0;
  if (data) {
    musics = data.data;
    a = 1;
  }

  const [음악, 음악변경] = useState();
  const [str, str변경] = useState();
  const changeMusic = async (data) => {
    console.log(data);
    음악변경(`https://ipfs.io/ipfs/${data}`);
    str변경(data);
    console.log(음악);
  };

  const upLike = async (data) => {
    // 좋아요는 react-query로 관리할 것임

    const like = await axios.post("http://localhost:8080/api/upLike2", {
      CID: data,
    });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={6}>
              <MusicPlayer str={str}></MusicPlayer>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                {/* <Title>Recent Orders</Title> */}
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>순위</TableCell>
                      <TableCell>노래제목</TableCell>
                      <TableCell>좋아요</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a === 1 ? (
                      musics.map((a) => (
                        <TableRow key={a.title}>
                          <TableCell>{a.title}</TableCell>
                          <TableCell
                            onClick={() => {
                              changeMusic(a.CID);
                            }}
                          >
                            {a.CID}
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              upLike(a.CID);
                            }}
                          >
                            {a.LikeMusic}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <h1>아님</h1>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>

      {/* 테이블 나열하고 클릭시 */}
      {/* AudioPlayer 실행 */}
      {/* <AudioPlayer
        autoPlay
        // src="https://ipfs.io/ipfs/QmXmsjFBRPEeJ9US2QkNgrDmHgUb6ajSRrcfprSFuTyDoM"
        src={음악}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      /> */}
    </div>
  );
};

export default ListenMusic;
