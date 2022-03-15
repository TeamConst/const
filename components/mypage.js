import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { fetchLocals } from "../hooks/locals";

const theme = createTheme();

// const usePosts = (limit) => {
//   return useQuery(["posts", limit], () => fetchPosts(limit));
// };

const Mypage1 = () => {
  // const { data, isLoading, isFetching } = useQuery(["locals"], () =>
  //   fetchLocals()
  // );

  const { data, isLoading, isFetching } = useQuery("locals", fetchLocals);

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
                  반갑습니다 00님
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
    </div>
  );
};

export default Mypage1;
