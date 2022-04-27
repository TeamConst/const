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
import { fetchNowNFT } from "../../../hooks";

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
const theme = createTheme();

const GetNowNFT = () => {
  const useUser1 = () => {
    const result = useQuery(["getNowNFT"], () => fetchNowNFT());
    return result;
  };

  const data1 = useUser1();

  const useUser2 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const data2 = useUser2();

  let a = 0;
  let nftNowData;
  if (data1.data) {
    a = 1;
    nftNowData = data1.data.data;
  }

  let b = 0;
  let userSession;
  if (data2.data) {
    b = 1;
    userSession = data2.data.data;
  }

  let c = 0;
  if (userSession && nftNowData) {
    c = 1;
    for (let i = 0; i < nftNowData.length; i++) {
      if (nftNowData[i].LikeMusics) {
        for (let j = 0; j < nftNowData[i].LikeMusics.length; j++) {
          if (nftNowData[i].LikeMusics[j].address == userSession.address) {
            nftNowData[i].userSession.likemusic = true;
          } else {
            nftNowData[i].userSession.likemusic = false;
          }
        }
      }
      if (nftNowData[i].BookmarkMusics) {
        for (let j = 0; j < nftNowData[i].BookmarkMusics.length; j++) {
          if (nftNowData[i].BoomarkMusics[j].address == userSession.address) {
            nftNowData[i].userSession.bookmarkmusic = true;
          } else {
            nftNowData[i].userSession.bookmarkmusic = false;
          }
        }
      }
    }
  }

  const [하트, 하트변경] = useState(false);
  // 좋아요
  const upLike = async (data) => {
    if (하트 == false) {
      const like = await axios.post("http://localhost:8080/api/upLike", {
        CID: data,
      });
      하트변경(true);
    } else {
      const like = await axios.post("http://localhost:8080/api/cancelLike2", {
        CID: data,
      });
      하트변경(false);
    }
  };

  // 북마크

  const linkto = async (data) => {
    console.log(data);
    const abcd = await axios.post("http://localhost:8080/api/getNFTLocation", {
      CID: data.CID,
    });
    window.location.href = `http://localhost:8080/${abcd.data}/${data.CID}`;
  };

  console.log(nftNowData);

  console.log(userSession);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography variant="h4" component="h4" sx={{ m: 3 }}>
            All NFT
          </Typography>
          <Grid container spacing={5} textAlign="center">
            {a === 1 ? (
              <Box>
                {b === 0
                  ? nftNowData.map((a) => (
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
                                  src={a.User.profileImg}
                                  alt="하트"
                                />{" "}
                                {a.User.id2}
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
                                <div>{a.LikeMusic}</div>
                                <IconReact
                                  src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/comment.png"
                                  alt="말풍선"
                                />
                                <div>{a.view}</div>
                              </IconLeft>
                              <IconReact2
                                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/bookmark.png"
                                alt="북마크"
                              />
                            </IconsReact>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  : nftNowData.map((a) => (
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
                                  src={a.User.profileImg}
                                  alt="하트"
                                />{" "}
                                {a.User.id2}
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
                                {/* {a.userSession.likemusic == true ? (
                            <Box>
                              <IconReact
                                onclick={() => upLike()}
                                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
                                alt="하트"
                              />
                              <div>풀 하트 넣어야함</div>
                            </Box>
                          ) : (
                            <Box>
                              <IconReact
                                onclick={() => upLike()}
                                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
                                alt="하트"
                              />
                              <div>{a.LikeMusic}</div>
                            </Box>
                          )} */}

                                <IconReact
                                  src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/comment.png"
                                  alt="말풍선"
                                />
                                <div>{a.view}</div>
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
              </Box>
            ) : (
              <div>
                <h1>아직 나와있는 상품이 없어용</h1>
              </div>
            )}
          </Grid>
          <button>상품개수제한</button>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetNowNFT;
