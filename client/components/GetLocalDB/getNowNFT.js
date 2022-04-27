import { Button, Typography, Grid, Box, TextField, Container, Card, CardActions, CardContent, CardMedia } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useQuery } from "react-query";
import { fetchNowNFT } from "../../hooks";

import Link from "next/link";
import axios from "axios";

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
  const { data, isLoading, isFetching } = useQuery(["getNowNFT"], () => fetchNowNFT());

  let a = 0;
  let nftNowData = [];
  console.log(data);

  if (data) {
    if (data.data.length > 0) {
      a = 1;
      for (let i = 0; i < data.data.length; i++) {
        nftNowData[i] = data.data[i];
        nftNowData[i].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
      }
    }
  }

  const linkto = async (data) => {
    console.log(data);
    const abcd = await axios.post("http://localhost:8080/api/getNFTLocation", {
      CID: data.CID,
    });
    window.location.href = `http://localhost:8080/${abcd.data}/${data.CID}`;
  };

  console.log(nftNowData);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Typography variant="h4" component="h4" sx={{ m: 3 }}>
            All NFT
          </Typography>
          <Grid container spacing={5} textAlign="center">
            {a === 1 ? (
              nftNowData.map((a) => (
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
                          <ProfileImg src={"https://img.marieclairekorea.com/2022/02/mck_620f69c1deca3-scaled.jpg"} alt="하트" /> {a.artist}
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
                          <IconReact src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png" alt="하트" />
                          <div>{a.LikeMusic}</div>
                          <IconReact src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/comment.png" alt="말풍선" />
                          <div>{a.view}</div>
                        </IconLeft>
                        <IconReact2 src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/bookmark.png" alt="북마크" />
                      </IconsReact>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <div>
                <h1>아직 나와있는 상품이 없어용</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetNowNFT;
