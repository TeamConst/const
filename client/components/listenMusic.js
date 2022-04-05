import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
// import ipfsClient from "ipfs-http-client";
import { create } from "ipfs-http-client";
// import { create } from "ipfs-core";
import { useRef, useState, useEffect } from "react";
import { fetchMusics } from "../hooks";

import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import coreIsIterable from "core-js/modules/core.is-iterable";

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const mdTheme = createTheme();

const ListenMusic = () => {
  // 여기부터
  const { data, isLoading, isFetching } = useQuery(["musics"], () =>
    fetchMusics()
  );
  console.log(data)
  let musics;
  let a = 0;
  if (data) {
    musics = data.data;
    a = 1;
  }

  useEffect(() => {}, []);

  const changeMusic = async (data) => {
    console.log(data);
    음악변경(`https://ipfs.io/ipfs/${data}`);
    console.log(음악);
  };

  const [음악, 음악변경] = useState();

  const upLike = async (data) => {
    // 좋아요는 react-query로 관리할 것임
    const upLikeResult = await axios.post(
      "http://localhost:8080/api/upLike",
      data
    );
    console.log(upLikeResult);
  };

  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
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
                      {a.title}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        upLike(a.title);
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
      </ThemeProvider>

      {/* 테이블 나열하고 클릭시 */}
      {/* AudioPlayer 실행 */}

      <AudioPlayer
        autoPlay
        // src="https://ipfs.io/ipfs/QmXmsjFBRPEeJ9US2QkNgrDmHgUb6ajSRrcfprSFuTyDoM"
        src={음악}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
};

export default ListenMusic;
