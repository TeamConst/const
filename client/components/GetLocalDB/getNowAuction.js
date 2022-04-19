import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useQuery } from "react-query";
import { fetchNowAuction } from "../../hooks";

import Link from "next/link";

const theme = createTheme();

const GetNowAuction = () => {
  const { data, isLoading, isFetching } = useQuery(["getNowAuction"], () =>
    fetchNowAuctiony()
  );

  let a = 0;
  let auctionNowData = [];
  console.log(data);

  if (data) {
    if (data.data.length > 0) {
      a = 1;
      for (let i = 0; i < data.data.length; i++) {
        auctionNowData[i] = data.data[i];
        auctionNowData[
          i
        ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
      }
    }
  }

  console.log(a);
  console.log(auctionNowData);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {a === 1 ? (
              auctionNowData.map((a) => (
                <Link href={`/buy/${encodeURIComponent(a.CID)}`}>
                  <Grid item key={a.CID} xs={12} sm={6} md={4}>
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
                        image={a.s3}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        ID
                        <Typography>{a.id}</Typography>
                        CID
                        <Typography>{a.img}</Typography>
                        Owner
                        <Typography>{a.owner}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Link>
              ))
            ) : (
              // <div>{JSON.stringify(data)}</div>
              <div>
                <h1>아직 경매로 나온 상품이 없어용</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetNowAuction;
