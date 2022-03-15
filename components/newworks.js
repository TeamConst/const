import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const Newworks = (data) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
      ; // 여기서 만든 구조들을 나중에 컴포넌트로 올릴 것임 // Render data...
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // react-query 코드
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));
  // return {
  //   props: {
  //     dehydratedState: dehydrate(queryClient),
  //   },
  // };

  // Fetch data from external API
  //   const res = await axios.get(`https://.../data`);
  //   const data = await res.json();
  const data = 12;
  // Pass data to the page via props
  return { props: { data } };
}

export default Newworks;
