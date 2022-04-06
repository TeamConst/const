import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { fetchLocals } from "../hooks/locals";
import { useEffect ,useState} from "react";
import web3 from "../components/connection/web3";
import Web3 from "web3";
import MintedImages from "./MintedImages";
import { fetchMusics } from "../hooks";
import axios from "axios";
//
import Link from "next/link";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//
const mdTheme = createTheme();
const theme = createTheme();
console.log("wev3",web3)

const Mypage1 = () => {
  
//   const { data2} = useQuery(["buysell"], () =>
//   fetchBuySell(id)
// );
  const { music, isLoading, isFetching } = useQuery(["musics"], () =>
    fetchMusics()
  );
  // console.log(data2)
  console.log(music);
  let musics;
  let a = 0;
  if (music) {
    musics = music.data;
    a = 1;
  }

  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  마이페이지
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>                
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  접속 관리
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  회원정보 수정
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  나의 NFT
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  자세히 보기
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진1
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      아티스트
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      좋아요 수
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      곡 별 재생시간 등등
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진2
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      아티스트
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      좋아요 수
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      곡 별 재생시간 등등
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  이용권 정보
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  총 재생시간
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  청취 곡 수
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  Recently Played 등등
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
          <br/>
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
            <Link href={`/buysell/${encodeURIComponent(a.title)}`}>dd</Link>
            <TableBody>
              {a === 1 ? (
                musics.map((a) => (
                  <TableRow key={a.title}>
                    <TableCell>{a.title}</TableCell>
                    <TableCell
                      // onClick={() => {
                      //   changeMusic(a.CID);
                      // }}
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

      {/* <AudioPlayer
        autoPlay
        // src="https://ipfs.io/ipfs/QmXmsjFBRPEeJ9US2QkNgrDmHgUb6ajSRrcfprSFuTyDoM"
        src={음악}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      /> */}
    </div>
    </div>
    
  );
};

export default Mypage1;
