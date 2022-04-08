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
import { fetchAuction } from "../hooks";
import io from "socket.io-client";

const theme = createTheme();

const GetAuction = () => {
  const { data, isLoading, isFetching } = useQuery(["getAuction"], () =>
    fetchAuction()
  );

  const socketClient = io("http://localhost:3000");

  // 서버에서 받기
  socketClient.on("refreshAuction", (req) => {
    console.log("서버에서 refreshAuction 받기 성공");
    // queryClient.invalidateQueries("getAuctions");
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let images;
  let auctions;
  let a = 0;
  let tokenID;
  let status;

  let b;
  let c;
  if (data) {
    // 컨트랙트 자체를 수정해야 하긴 하는데
    // 일단은 클라이언트에서 처리하는 식으로도 한번 해보겠음
    images = data.data.image;
    auctions = data.data.auction;
    a = 1;

    // console.log(data.data.image[0].tokenURI);
    b = data.data.image[0].tokenURI.substring(
      21,
      data.data.image[0].tokenURI.length
    );
    c = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${b}.jpg`;

    let image = data.data.image[0];
    let auction = data.data.auction[0];
    console.log(image);
    console.log(auction);
    status =
      image.status == 0
        ? "경매종료"
        : image.status == 1
        ? "경매중"
        : "청구 대기 중";

    tokenID = image.tokenID;
    let minBid2 = minBid * currenciesIU;
    let duration2 = duration * timesIU;
    let newBid2 = newBid * currenciesIU;
  }

  const [minBid, setMinBid] = useState(0);
  const [currenciesIU, setCurrenciesIU] = useState(1);
  const [duration, setDuration] = useState(0);
  const [timesIU, setTimesIU] = useState(1);
  const [newBid, setNewBid] = useState(0);

  const putOnBid = async () => {
    // let tokenID = props.tokenID;
    console.log("=== tokenID ===", tokenID);
    // let minBid = minBid * currenciesIU;
    // let duration = duration * timesIU;
    console.log("minBid", minBid);

    /// 판매 개시(소유자라고도 하는 판매자)
    await props.Contract.methods
      .beginAuction(tokenID, minBid2, duration2)
      .send({ from: props.accountAddress });
    window.location.reload(true);
  };

  return (
    <div>
      {a === 1 ? (
        <ThemeProvider theme={theme}>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              <Grid item key={a.Key} xs={12} sm={6} md={4}>
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
                    image={c}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    ID
                    <Typography>{image.tokenID}</Typography>
                    NAME
                    <Typography>{image.tokenName}</Typography>
                    현재 경매가
                    <Typography>{auction.highestBid}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      ) : (
        // <div>{JSON.stringify(data)}</div>
        <div>
          <h1>아님</h1>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {a === 1 ? (
  //       auctions.image.map((a) => <div>{a.winner}</div>)
  //     ) : (
  //       // <div>{JSON.stringify(data)}</div>
  //       <div>
  //         <h1>아님</h1>
  //       </div>
  //     )}
  //   </div>
  // );

  // return (
  //   <div>
  //     {a === 1 ? (
  //       <Box width={800}>
  //         <Grid container spacing={2}>
  //           <Grid item>
  //             {/* <DetailInfo
  //           image={image}
  //           auction={auction}
  //           ownerShipTrans={ownerShipTrans}
  //         /> */}
  //           </Grid>
  //           <Grid item xs={12} sm container>
  //             <Grid item xs container direction="column">
  //               <Grid item xs={2}>
  //                 <br />
  //                 <Typography gutterBottom variant="h5">
  //                   Token ID: {image.tokenID}
  //                 </Typography>
  //               </Grid>
  //               <Grid item xs={2}>
  //                 <br />
  //                 <Typography gutterBottom variant="h6" component="div">
  //                   Image Name: {image.tokenName}
  //                 </Typography>
  //               </Grid>
  //               <Grid item>
  //                 <Typography gutterBottom variant="h6" component="div">
  //                   Status: {status}
  //                 </Typography>
  //               </Grid>
  //               <Grid item>
  //                 {/* For Button */}
  //                 {image.status == 0 ? ( // Hard to read I guess
  //                   <div>
  //                     <Button variant="개요" onClick={handleClickOpen}>
  //                       입찰하다
  //                     </Button>
  //                     <Dialog open={open} onClose={handleClose}>
  //                       <form onSubmit={putOnBid}>
  //                         <DialogTitle>입찰하다</DialogTitle>
  //                         <DialogContent>
  //                           <DialogContentText>
  //                             경매를 시작하려면 다음 정보를 입력하세요.
  //                           </DialogContentText>
  //                           <Box>
  //                             <TextField
  //                               label="Starting Bid"
  //                               type="number"
  //                               width={100}
  //                               variant="standard"
  //                               required
  //                               onChange={(e) => setMinBid(e.target.value)}
  //                             />
  //                             <br />
  //                             <Select
  //                               defaultValue={1}
  //                               variant="standard"
  //                               onChange={(e) =>
  //                                 setCurrenciesIU(e.target.value)
  //                               }
  //                             >
  //                               <MenuItem value={1}>Wei</MenuItem>
  //                               <MenuItem value={1000000000000}>Szabo</MenuItem>
  //                             </Select>
  //                           </Box>
  //                           <Box>
  //                             <TextField
  //                               label="Durations"
  //                               type="number"
  //                               width={100}
  //                               variant="standard"
  //                               required
  //                               onChange={(e) => setDuration(e.target.value)}
  //                             />
  //                             <br />
  //                             <Select
  //                               defaultValue={1}
  //                               variant="standard"
  //                               onChange={(e) => setTimesIU(e.target.value)}
  //                             >
  //                               <MenuItem value={1}>Second</MenuItem>
  //                               <MenuItem value={60}>Minute</MenuItem>
  //                               <MenuItem value={3600}>Hour</MenuItem>
  //                             </Select>
  //                           </Box>
  //                         </DialogContent>
  //                         <DialogActions>
  //                           <Button onClick={handleClose}>Cancel</Button>
  //                           <Button type="submit">Start</Button>
  //                         </DialogActions>
  //                       </form>
  //                     </Dialog>
  //                   </div>
  //                 ) : image.status == 1 ? (
  //                   leftTime > 0 ? (
  //                     isOwner ? (
  //                       <Button>경매 종료 날짜 {leftTime}s</Button>
  //                     ) : (
  //                       <div>
  //                         <Button variant="outlined" onClick={handleClickOpen}>
  //                           경매 종료 날짜{leftTime}s, Bid!!!
  //                         </Button>
  //                         <Dialog open={open} onClose={handleClose}>
  //                           <form onSubmit={bid}>
  //                             <DialogTitle>입찰하다</DialogTitle>
  //                             <DialogContent>
  //                               <DialogContentText>
  //                                 입찰가를 채워주세요
  //                               </DialogContentText>
  //                               <TextField
  //                                 label="Your Bid"
  //                                 type="number"
  //                                 width={100}
  //                                 variant="standard"
  //                                 required
  //                                 onChange={(e) => setNewBid(e.target.value)}
  //                               />
  //                               <br />
  //                               <Select
  //                                 defaultValue={1}
  //                                 variant="standard"
  //                                 onChange={(e) =>
  //                                   setCurrenciesIU(e.target.value)
  //                                 }
  //                               >
  //                                 <MenuItem value={1}>Wei</MenuItem>
  //                                 <MenuItem value={1000000000000}>
  //                                   Szabo
  //                                 </MenuItem>
  //                               </Select>
  //                             </DialogContent>
  //                             <DialogActions>
  //                               <Button onClick={handleClose}>Cancel</Button>
  //                               <Button type="submit">Bid</Button>
  //                             </DialogActions>
  //                           </form>
  //                         </Dialog>
  //                       </div>
  //                     )
  //                   ) : isOwner ? (
  //                     <Button onClick={endOnBid}>이제 끝낼 수 있습니다.</Button>
  //                   ) : (
  //                     <Button>Time Up, 소유자가 종료하기를 기다리는 중.</Button>
  //                   )
  //                 ) : (
  //                   <Button onClick={claim}>To be claimed</Button>
  //                 )}
  //                 <span style={{ padding: "5px" }}></span>
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     ) : (
  //       <h1>안댐</h1>
  //     )}
  //   </div>
  // );
};

export default GetAuction;
