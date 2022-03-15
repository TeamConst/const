import { useForm } from "react-hook-form";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Music = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    음원 등록
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    앨범커버 이미지 등록
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        제목
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        아티스트(자동입력)
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        앨범명
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        발매년도
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        장르
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        작곡가
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        작사가
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        음원(파일)
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </main>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              음원 등록
            </Button>
          </Container>
        </ThemeProvider>
      </div>
    </form>
  );
};

export default Music;
