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

import MusicPlayer from "../Musicplay/MusicPlayer";

const theme = createTheme();

const ListenMusic = () => {
    const useUser1 = () => {
        const result = useQuery(["getMusicTop100"], () => fetchMusicTop100());
        return result;
    };

    // 컨트랙트 처리 위해서
    // const useUser2 = (data) => {
    //     const result = useQuery(["getMusic"], () => fetchMusic(data));
    //     return result;
    // };

    const data1 = useUser1();

    let a = 0;
    let musics;
    if (data1.data) {
        a = 1;
        musics = data1.data.data;
    }

    let b = 0;
    if (musics) {
        for (let i = 0; i < musics.length; i++) {
            musics[i].rank = i + 1;
        }
        b = 1;
    }
    const [쿼리, 쿼리변경] = useState();

    const setQuery = () => {
        쿼리변경("abcd");
    };

    if (쿼리 == "abcd") {
        const data2 = useUser2("abcd");
    }

    // let a = 0;
    // let musicTop100;
    // if (data1.data) {
    //   a = 1;
    //   musicTop100 = data1.data.data;
    // }

    // let b = 0;
    // let musicData;
    // if (data2.data) {
    //   b = 1;
    //   musicData = data2.data.data;
    // }
    // console.log(musicData);

    const [음악, 음악변경] = useState();
    const [str, str변경] = useState();
    const [title, title변경] = useState();
    const [artist, artist변경] = useState();
    const [, updateState] = useState();
    const forceUpdate = useCallback(()=>updateState({}),[])
    const changeMusic = async (data) => {
        console.log(data);
        음악변경(`https://ipfs.infura.io/ipfs/${data.CID}`);
        str변경(data.CID);
        title변경(data.title);
        artist변경(data.artist);
        console.log(음악);
    };

    console.log(str);
    const upLike = async (data) => {
        // 좋아요는 react-query로 관리할 것임

        const like = await axios.post("http://localhost:8080/api/upLike", {
            CID: data,
        });
    };

    console.log(musics);
    return (
        <div>
            <Box sx={{ m: 15 }}></Box>
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <button onClick={forceUpdate}>dd</button>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid item xs={6} sx={{ pr: 10 }}>
                            <MusicPlayer str={str}
                            artist={artist}
                            title={title}></MusicPlayer>
                        </Grid>
                        <Grid item xs={6} textAlign="center">
                            <Box sx={{ display: "flex" }}>
                                <Table size="small" textAlign="center">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>순위</TableCell>
                                            <TableCell>이미지</TableCell>
                                            <TableCell>노래제목</TableCell>
                                            <TableCell>좋아요</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody textAlign="center">
                                        {a === 1 ? (
                                            musics.map((a) => (
                                                <TableRow key={a.title}>
                                                    <TableCell>
                                                        {a.rank}
                                                    </TableCell>
                                                    <TableCell>
                                                        <img
                                                            src={a.s3}
                                                            width={"100px"}
                                                        ></img>
                                                    </TableCell>

                                                    <TableCell
                                                        onClick={() => {
                                                            changeMusic(a);
                                                        }}
                                                    >
                                                        {a.title}
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
        </div>
    );
};

export default ListenMusic;
