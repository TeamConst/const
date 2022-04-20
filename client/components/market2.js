import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
<<<<<<< HEAD
import { Typography, Stack, Paper, styled } from "@mui/material";
import {
  Button,
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

import axios from "axios";

import MusicPlayer from "../components/Musicplay/MusicPlayer";

=======
import MintedImages from "../components/MintedImages"
import { withRouter } from 'next/router';
import  DetailInfo from "../components/ImageCard/DetailInfo"
import { Typography, Stack, Paper, styled } from '@mui/material';
import {
  Button, TextField, MenuItem, Select, InputLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import AuctionMint from "./Auction/AuctionMint";
import axios from "axios";
import MusicPlayer from "../components/Musicplay/MusicPlayer";
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

const Market2 = (props) => {
    
    console.log(props)
 
    // let accountAddress = props.accountAddress
    let Contract = props.Contract
    // 
    const router = useRouter()
    const { id } = router.query;
    const { add } = router.query;
    const [이미지, 이미지변경] = useState();
  
    useEffect(() => {
      이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
    }, [id]);

<<<<<<< HEAD
  // let accountAddress = props.accountAddress
  let Contract = props.Contract;
  //

  const router = useRouter();
  const { id } = router.query;
  const [이미지, 이미지변경] = useState();

  console.log(이미지);
  useEffect(() => {
    이미지변경(
      `https://const123.s3.ap-northeast-2.amazonaws.com/image/${id}.jpg`
    );
  }, [id]);

  const fromDb = id;
  let str = fromDb || `${id}`;

  console.log(str.slice(6, 52));
  str = str.slice(0, 52);
  console.log(str);
=======



    console.log({ add })




    const fromDb = id;
    let str = fromDb || `${id}`;
  
  console.log(str.slice(6,52))
  str = str.slice(6,52)
  console.log(str)
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
  const [음악, 음악변경] = useState();
  const changeMusic = async (str) => {
    console.log(str);
    음악변경(`https://ipfs.io/ipfs/${str}`);
    console.log(`https://ipfs.io/ipfs/${str}`);
    
  }
 


  let a = 0;

<<<<<<< HEAD
  const [open, setOpen] = useState(false);
=======
//
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638

const handleClose = () => {
  setOpen(false);
};

    //
   const [ownerShipTrans,setOwnerShipTrans]=useState([]);
   const [currenciesIU,setCurrenciesIU]=useState(1);
   const [timesIU,setTimesIU]=useState(1);
   const [minBid,setMinBid]=useState(0);
   const [duration,setDuration]=useState(0);
   const [newBid,setNewBid]=useState(0);
   const [ready,setReady]=useState(false);
useEffect(() => {
setReady(false)
const image = props.image;
let ownerShipTrans = [];
for (let i = 0; i < image.transferTime; i++) {
  let address = props.Contract.methods.ownerShipTrans(image.tokenID, i).call();
  ownerShipTrans.push(address);
}
setOwnerShipTrans(ownerShipTrans )
setReady(true)
}, [])


  let image = props.image;
  let auction2 = props.Auction;

  console.log("props",props)
  console.log("endTime",auction2.endTime)
  let isOwner = (props.image.currentOwner === props.accountAddress);
  let leftTime = (auction2.endTime - props.currentTime);
  let status = image.status == 0 ? "경매종료" : image.status == 1 ? "경매중" : "청구 대기 중";
   

  let tokenID = props.tokenID;
  let minBid2 = minBid * currenciesIU;
  let duration2 = duration * timesIU;
  let newBid2 = newBid * currenciesIU;
  const  putOnBid = async () => {
    // let tokenID = props.tokenID;
    console.log("=== tokenID ===", tokenID);
    // let minBid = minBid * currenciesIU;
    // let duration = duration * timesIU;
    console.log("minBid",minBid)
    
/// 판매 개시(소유자라고도 하는 판매자)
    await props.Contract.methods.beginAuction(tokenID, minBid2, duration2).send({ from: props.accountAddress });
    window.location.reload(true);
  }

  const  endOnBid = async () => {
    let tokenID = props.tokenID;
    console.log("=== tokenID ===", tokenID);

    await props.Contract.methods.endAuction(tokenID).send({ from: props.accountAddress });
    window.location.reload(true);
  }
  // let tokenID = props.tokenID;
    let auction = props.Auction;
  //   let newBid = newBid * currenciesIU;
  
const  bid = async () => {
    let tokenID = props.tokenID;
    // let auction = props.Auction;
    // let newBid = newBid * currenciesIU;

    if (newBid <= auction.highestBidPrice) {
      window.alert("낮은 입찰가? 농담!");
      return;
    }
    await props.Contract.methods.bid(tokenID, newBid2).send({ from: props.accountAddress });
    window.location.reload(true);
  }

 const claim = async () => {
    let tokenID = props.tokenID;
    let auction = props.Auction;

    if (props.accountAddress != auction.winner) {
      window.alert("당신은 승자가 아닙니다!");
      return;
    }
    console.log(auction.highestBid);
    await props.Contract.methods.claim(tokenID).send({ from: props.accountAddress, value: auction.highestBid });
    window.location.reload(true);
  }
  console.log(image.status)
//   let onBid = (image.status == 1);
//   let toBeClaim = (image.status == 2);
  console.log(currenciesIU)
  console.log(ownerShipTrans)

  console.log(str)
  const ondada=()=>{
    console.log("dada")
  }

  const onSubmit = async () => {

    const mintby =image.currentOwner
    console.log(str)
    const str2=str
  const rere = await axios.post("http://localhost:8080/api/updateauction", {mintby:mintby,CID:str2});
  console.log(rere)
  // window.location.reload(true);
  }

      return (   
        <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    사진
                    <img src={이미지} height="300" width="300"></img>
                
                  </Box> */}
                </Grid>
                
                {a === 1 ? (
                  <Grid item xs={6}>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          {/* 제목{abcd.title} */}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          {/* 판매자{abcd.artist} */}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          {/* 조회수{abcd.playCount} */}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          {/* 좋아요{abcd.LikeMusic} */}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          에디션
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box bgcolor="info.main" color="info.contrastText" p={2}>
                          가격 옥션에 대한 db 추가해야함
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
                ) : (
                  <h1></h1>
                )}
                 
                <Grid item xs={6} sm={3}>
 
                </Grid>
<<<<<<< HEAD
              ) : (
                <h1>아님</h1>
              )}

              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  디테일 정보
                  {str}
                </Box>
                <AudioPlayer
                  autoPlay
                  src={`https://ipfs.io/ipfs/${str}`}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
                />

                <MusicPlayer str={str} />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  저장 정보
                </Box>
                <DialogContent>
                  <Grid item xs container direction="column">
                    {/* <Grid item>
=======
                <Grid item xs={12}>
                <MusicPlayer
 str={str}
        />    
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    저장 정보
                  </Box>
                  <DialogContent>
          <Grid item xs container direction="column">
            {/* <Grid item>
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
              <Typography variant="h5">
              세부 정보
              </Typography>
            </Grid> */}
            {/* <Grid item> */}
              <Typography variant="body2" color="text.secondary">
                Name: {image.tokenName}
                <br />
                Highest Auction Price: {window.web3.utils.fromWei(`${image.highestBidPrice}`, 'ether')} ETH
                <br />
                Minted By: {image.mintedBy}
                <br />
                Owner: {image.currentOwner}
                <br /><br />
              </Typography>
            {/* </Grid> */}
            <Grid item>
              <Typography variant="h5">
              소유권 경로
              </Typography>
              {/* {ownerShipTrans.map((address, index) => {
                return (
                  <Typography variant="body2" color="text.secondary" key={index}>{address} -&gt;</Typography>
                );
              })} */}
              <Typography variant="body2" color="text.secondary">(Current)<br /><br /></Typography>
            </Grid>
            {/* {onBid || toBeClaim ? */}
              <Grid item>
                {/* {onBid ? */}
                  <Typography variant="h5" color="red">
                    경매 중
                  </Typography>
                  : <Typography variant="h5" color="green">
                    청구 대상
                  </Typography>
                {/* } */}
                <Typography variant="body2" color="text.secondary">
                입찰 시작: {window.web3.utils.fromWei(`${auction.startBid}`, 'ether')} ETH
                  <br />
                  현재 입찰가: {window.web3.utils.fromWei(`${auction.highestBid}`, 'ether')} ETH
                  <br />
                  현재 우승자: {auction.winner}
                  <br /><br />
                </Typography>
              </Grid>
              : <div />
            {/* } */}
          </Grid>
        </DialogContent>
                </Grid>
                {/* <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    가격 그래프
                  </Box>
                </Grid> */}
                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    빈칸
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                 <Box  bgcolor="info.main" color="info.contrastText" p={2}>
                 <Stack elevation={12} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                 <Grid container spacing={2}>
        <Grid item>
     
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column">
            <Grid item xs={2}>
              <br />
              <Typography gutterBottom variant="h5">
                Token ID: {image.tokenID}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <br />
              <Typography gutterBottom variant="h6" component="div">
                Image Name: {image.tokenName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                Status: {status}
              </Typography>
            </Grid>
            <Grid item>
              {/* For Button */}
              {image.status == 0 ? // Hard to read I guess
                <div>
                <Button variant="개요" onClick={handleClickOpen}>
                입찰하다
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <form onSubmit={putOnBid}>
                    <DialogTitle>입찰하다</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                       
          경매를 시작하려면 다음 정보를 입력하세요.
                      </DialogContentText>
                      <Box>
                        <TextField
                          label="Starting Bid"
                          type="number"
                          width={100}
                          variant="standard"
                          required
                          onChange={(e) => setMinBid( e.target.value )}
                        /><br />
                        <Select
                          defaultValue={1}
                          variant="standard"
                          onChange={(e) => setCurrenciesIU( e.target.value )}
                        >
                          <MenuItem value={1}>Wei</MenuItem>
                          <MenuItem value={1000000000000}>Szabo</MenuItem>
                        </Select>
                      </Box>
                      <Box>
                        <TextField
                          label="Durations"
                          type="number"
                          width={100}
                          variant="standard"
                          required
                          onChange={(e) => setDuration( e.target.value )}
                        /><br />
                        <Select
                          defaultValue={1}
                          variant="standard"
                          onChange={(e) => setTimesIU( e.target.value )}
                        >
                          <MenuItem value={1}>Second</MenuItem>
                          <MenuItem value={60}>Minute</MenuItem>
                          <MenuItem value={3600}>Hour</MenuItem>
                        </Select>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Start</Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
                : image.status == 1 ?
                  leftTime > 0 ?
                    isOwner ?
                      <Button>
                      경매 종료 날짜 {leftTime}s</Button>
                      :  <div>
                      <Button variant="outlined" onClick={handleClickOpen}>
                       경매 종료 날짜{leftTime}s, Bid!!!
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={bid}>
                          <DialogTitle>입찰하다</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                             입찰가를 채워주세요
                            </DialogContentText>
                            <TextField
                              label="Your Bid"
                              type="number"
                              width={100}
                              variant="standard"
                              required
                              onChange={(e) => setNewBid(e.target.value )}
                            /><br />
                            <Select
                              defaultValue={1}
                              variant="standard"
                              onChange={(e) => setCurrenciesIU(e.target.value )}
                            >
                              <MenuItem value={1}>Wei</MenuItem>
                              <MenuItem value={1000000000000}>Szabo</MenuItem>
                            </Select>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Bid</Button>
                          </DialogActions>
                        </form>
                      </Dialog>
                    </div>
                    : isOwner ?
                      <Button onClick={()=>{endOnBid();onSubmit()}}>이제 끝낼 수 있습니다.</Button>
                      : <Button>Time Up, 소유자가 종료하기를 기다리는 중.</Button>
                  : <Button onClick={claim}>To be claimed</Button>
              }
              <span style={{ padding: "5px" }}></span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
               </Stack>  
                 </Box>
                 <div></div>
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
        <div>    
      
        </div>
      </div>
      )

//  })}  
 } 

export default Market2;