import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Market = () => {
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
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      제목
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      판매자
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      조회수
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      좋아요
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      에디션
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      가격
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

              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  디테일 정보
                </Box>
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
