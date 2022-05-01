// 서버 페칭만 써볼 거에요 이 컴포넌트는
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

import { QueryClient, useQuery, useQueryClient } from "react-query";
import React, { useState, useEffect } from "react";
import { fetchBuy } from "../../hooks";
import io from "socket.io-client";

import Link from "next/link";

const theme = createTheme();

const GetBuy = () => {
  const { data, isLoading, isFetching } = useQuery(["getBuy"], () =>
    fetchBuy()
  );

  // const socketClient = io("http://local:3000");

  // 서버에서 받기
  // socketClient.on("refreshAuction", (req) => {
  //   console.log("서버에서 refreshAuction 받기 성공");
  //   // queryClient.invalidateQueries("getAuctions");
  // });

  let a = 0;
  let buyData = [];
  let b;
  let c;
  if (data) {
    a = 1;
    for (let i = 0; i < data.data.length; i++) {
      buyData[i] = data.data[i];
      buyData[
        i
      ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].img}.jpg`;
    }
  }

  console.log(buyData);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {a === 1 ? (
              buyData.map((a) => (
                <Link href={`/buy/${encodeURIComponent(a.img)}`}>
                  <Grid item key={a.img} xs={12} sm={6} md={4}>
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
                <h1>아님</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetBuy;
