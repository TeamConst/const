import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchBestCollections } from "../hooks";
import { fetchBuySell } from "../hooks";
import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
const theme = createTheme();

const Market = () => {
  const router = useRouter();
  const { id } = router.query;

  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
  }, [id]);

  const { data, isLoading, isFetching } = useQuery(["buysell"], () =>
    fetchBuySell(id)
  );
  // fetchBestCollections(id)

  console.log(id);
  let abcd;
  let a;
  if (data) {
    a = 1;
    abcd = data.data.dataValues;
    console.log(data.data.dataValues);

  }

  
  const fromDb = id;
  let str = fromDb || `${id}`;

console.log(str.slice(6,52))
str = str.slice(6,52)
console.log(str)
const [음악, 음악변경] = useState();
const changeMusic = async (str) => {
  console.log(str);
  음악변경(`https://ipfs.io/ipfs/${str}`);
  console.log(`https://ipfs.io/ipfs/${str}`);
  
};


  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진
                  <img src={이미지} height="300" width="300"></img>
                </Box>
              </Grid>
              {a === 1 ? (
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        제목{abcd.title}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        판매자{abcd.artist}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        조회수{abcd.playCount}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        좋아요{abcd.LikeMusic}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        에디션
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        가격 옥션에 대한 db 추가해야함
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        수량
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        구매
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        선물
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <h1>아님</h1>
              )}

              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  디테일 정보
                  {str}
                </Box>
                <AudioPlayer
        autoPlay
        // src="https://ipfs.io/ipfs/QmXmsjFBRPEeJ9US2QkNgrDmHgUb6ajSRrcfprSFuTyDoM"
        src={`https://ipfs.io/ipfs/${str}`}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  저장 정보
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  가격 그래프
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  빈칸
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이 날듯?
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      
      </ThemeProvider>
    </div>
  );
};

export default Market;
