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
import { fetchNowNFT } from "../../hooks";

import Link from "next/link";
import axios from "axios";

const theme = createTheme();

const GetNowNFT = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowNFT"], () =>
    fetchNowNFT()
  );

  let a = 0;
  let nftNowData = [];
  console.log(data);

  if (data) {
    if (data.data.length > 0) {
      a = 1;
      for (let i = 0; i < data.data.length; i++) {
        nftNowData[i] = data.data[i];
        nftNowData[
          i
        ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
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
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Typography variant="h4" component="h4" sx={{ m: 5 }}>
            모든 NFT
          </Typography>
          <Grid container spacing={5} textAlign="center">
            {a === 1 ? (
              nftNowData.map((a) => (
                <Grid item key={a.CID} xs={2} onClick={() => linkto(a)}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        m: 1,
                        height: "100%",
                        width: "100%",
                        objectFit: "fill",
                      }}
                      image={a.s3}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography>Title : {a.title}</Typography>
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
