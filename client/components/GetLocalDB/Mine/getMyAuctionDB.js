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
import { fetchMyAuctionDB } from "../../../hooks";

import Link from "next/link";

const theme = createTheme();

const GetMyAuctionDB = () => {
  const { data, isLoading, isFetching } = useQuery(["getMyAuctionDB"], () =>
    fetchMyAuctionDB()
  );

  let a = 0;
  let auctionMyData = [];

  if (data) {
    a = 1;
    auctionMyData = data.data;
    // if (data.data.length > 0) {
    //   a = 1;
    //   for (let i = 0; i < data.data.length; i++) {
    //     auctionMyData[i] = data.data[i];
    //     auctionMyData[
    //       i
    //     ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
    //   }
    // }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {a === 1 ? (
              auctionMyData.map((a) => (
                <Link href={`/auction/${encodeURIComponent(a.CID)}`}>
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
                        image={a.Music.s3}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        ID
                        <Typography>{a.id}</Typography>
                        CID
                        <Typography>{a.CID}</Typography>
                        Owner
                        <Typography>{a.currentOwner}</Typography>
                        S3
                        <Typography>{a.Music.s3}</Typography>
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

export default GetMyAuctionDB;
