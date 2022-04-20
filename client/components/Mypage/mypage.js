import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import web3 from "../connection/web3";

import { fetchBestCollections } from "../../hooks";
import axios from "axios";
//
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
//
import Link from "next/link";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ImageCard from "../ImageCard/ImageCard";

import GetMyBuy from "../GetContract/Mine/getMyBuy";
import GetMyNFT from "../GetContract/Mine/getMyBuy";
// import GetMyAuction from "../GetContract/Mine/getMyAuction";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";
//
import Web3 from "web3";
//
import { fetchUserSession, fetchMyNFTDB } from "../../hooks";

const theme = createTheme();

const Mypage1 = () => {
  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const useUser2 = () => {
    const result = useQuery(["getMyNFTDB"], () => fetchMyNFTDB());
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }

  let b = 0;
  let myNFTData;
  let count = 0;
  if (data2.data) {
    b = 1;
    myNFTData = data2.data.data;
    count = data2.data.data.length;
  }

  const claimFundsHandler = async () => {
    let pra2;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();

    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;
    praaccounts = accounts1;

    pra2.methods
      .claimFunds()
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해쉬해쉬", hash);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <button onClick={claimFundsHandler} className="btn btn-success">
              구매 완료 된 이더 받기
            </button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              버튼버튼
            </Button>
            {a === 1 && b === 1 ? (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    마이페이지
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    {userSession.name}님 반갑습니다
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 수익 현황
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    회원정보 수정
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    소유한 NFTS의 총 수:{count}
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myNFT/${userSession.address}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      NFT 관리하기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    나의 전체 NFT
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myNFT/${userSession.address}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyNFTDB></GetMyNFTDB>
                  {/* <GetMyNFT></GetMyNFT> */}
                </Grid>
                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    판매 중인 나의 NFT
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myBuy/${userSession.address}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyBuyDB></GetMyBuyDB>
                  {/* <GetMyBuy></GetMyBuy> */}
                </Grid>

                <Grid item xs={9}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    경매 중인 나의 NFT
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myAuction/${userSession.address}`}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      자세히 보기
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyAuctionDB></GetMyAuctionDB>
                  {/* <GetMyAuction></GetMyAuction> */}
                </Grid>

                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    이용권 정보
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 음원의 총 재생시간
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내 음원을 들은 총 횟 수
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    내가 최근 들은 곡 Recently Played 등등
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <div>오류임</div>
            )}
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Mypage1;
