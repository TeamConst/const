import React from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useQuery } from "react-query";

const theme = createTheme();

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
const IconsReact = styled.div`
  height: 20px;
  padding: 10px 20px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconReact = styled.img`
  width: 20%;
  height: 30%;
`;
const IconReact2 = styled.img`
  width: 20px;
  height: 20px;
`;
const IconLeft = styled.div`
  display: flex;
  align-items: center;
  float: left;
`;
const ProfileImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 70%;
  float: left;
`;
const Posts = ({ auctionNowData, Loading }) => {
  const linkto = async (data) => {
    console.log(data);
    const abcd = await axios.post("http://54.227.126.254:8080/api/getNFTLocation", {
      CID: data.CID,
    });
    window.location.href = `http://54.227.126.254:8080/${abcd.data}/${data.CID}`;
  };
  return (
    <div>
      <Container sx={{ py: 2 }} maxWidth="lg">
        <Typography variant="h4" component="h4" sx={{ m: 3 }}>
          All Auction
        </Typography>
        <Grid container spacing={5} textAlign="center">
          {auctionNowData.map((a) => (
            <Grid item key={a.CID} xs={3} onClick={() => linkto(a)}>
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                }}
              >
                <IconLeft>
                  <CardContent sx={{ flexGrow: 0 }}>
                    <Typography>
                      {" "}
                      <ProfileImg
                        src={a.AuctionMusic_CID.Music_address.profileImg}
                        alt="하트"
                      />{" "}
                      {a.AuctionMusic_CID.Music_address.id2}
                    </Typography>
                  </CardContent>
                </IconLeft>
                <CardMedia
                  component="img"
                  sx={{
                    height: "70%",
                    width: "100%",
                    objectFit: "fill",
                  }}
                  image={a.s3}
                  alt="random"
                />

                <CardContent sx={{ flexGrow: 0 }}>
                  <IconsReact>
                    <IconLeft>
                      <IconReact
                        src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
                        alt="하트"
                      />
                      <div>{a.AuctionMusic_CID.LikeMusic}</div>

                      <IconReact
                        src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/comment.png"
                        alt="말풍선"
                      />
                      <div>{a.AuctionMusic_CID.view}</div>
                    </IconLeft>
                    <IconReact2
                      src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/bookmark.png"
                      alt="북마크"
                    />
                  </IconsReact>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default Posts;
