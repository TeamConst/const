import { Grid, Container } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const getVideo = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 24 }} maxWidth="lg">
          <Grid item xs={12}>
            <video
              _ngcontent-tyb-c80=""
              muted=""
              loop=""
              autoplay=""
              width="100%"
              webkit-playsinline=""
              playsinline=""
              oncanplay="play()"
              onloadedmetadata="this.muted = true"
              src="/video/index.mp4"
              class="ng-star-inserted"
            ></video>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default getVideo;
