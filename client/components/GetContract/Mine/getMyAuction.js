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

import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchMyAuction } from "../../../hooks";
import web3 from "../../connection/web3";

import io from "socket.io-client";

const theme = createTheme();

let param;

const GetMyAuction = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);

  // get now accounts
  useEffect(() => {
    async function getNowAccount() {
      const accounts = await web3.eth.getAccounts();
      console.log("이거 왜", accounts[0]);
      param = accounts[0];
      console.log("pp", param);
    }
    getNowAccount();
  }, []);

  // 실시간 경매 Fetch
  const { data, isLoading, isFetching } = useQuery(["getMyAuction"], () =>
    fetchMyAuction(param)
  );
  console.log(isFetching);
  console.log(data);

  let auctions = [];
  let a = 0;
  if (data) {
    for (let i = 0; i < data.data.length; i++) {
      auctions[i] = data.data[i];
      let token = data.data[i].tokenURI;
      let slice = token.slice(21, token.length);
      auctions[
        i
      ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${slice}.jpg`;
    }
    a = 1;
  }

  console.log(auctions);

  //  클라이언트에서 그대로 불러오기
  const [이미지, 이미지변경] = useState([]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          {a === 1 ? (
            auctions.map((a) => (
              <div>
                <Grid container spacing={4}>
                  {/* <Link
                  href={`/buysell/${encodeURIComponent(`image/${str}.jpg`)}?add=${
                    props.accountAddress
                  }`}
                > */}

                  <Grid item key={a.tokenURI} xs={12} sm={6} md={4}>
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
                        <Typography gutterBottom variant="h5" component="h2">
                          현재주인 {a.currentOwner}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">클릭</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  {/* </Link> */}
                </Grid>
              </div>
            ))
          ) : (
            <div>
              <h1>아님</h1>
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetMyAuction;
