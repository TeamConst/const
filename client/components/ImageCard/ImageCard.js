import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {
  Button, Typography, Grid, Box, TextField, MenuItem, Select, InputLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
// import Loader from '../Loader';
import DetailInfo from './DetailInfo';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
const theme = createTheme();

function ImageCard (props) {
      console.log(props)
       const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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


    const image = props.image;
    const auction = props.Auction;
    console.log("aucion",auction)
    console.log("props",props)
    console.log("endTime",auction.endTime)
    let isOwner = (props.image.currentOwner === props.accountAddress);
    let leftTime = auction.endTime - props.currentTime;
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
    //   let auction = props.Auction;
    //   let newBid = newBid * currenciesIU;
    
  const  bid = async () => {
      let tokenID = props.tokenID;
      let auction = props.Auction;
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
    console.log(image[2])
    const fromDb = image[2];
  let str = fromDb || `${fromDb}`;

console.log(str.slice(21))
str = str.slice(21)
console.log(str)
// var param2 = {
//   "quiz": {
//       "sport": {
//           "q1": {
//               "question": "Which one is correct team name in NBA?",
//               "options": [
//                   "New York Bulls",
//                   "Los Angeles Kings",
//                   "Golden State Warriros",
//                   "Huston Rocket"
//               ],
//               "answer": "Huston Rocket"
//           }
//       },
//       "maths": {
//           "q1": {
//               "question": "5 + 7 = ?",
//               "options": [
//                   "10",
//                   "11",
//                   "12",
//                   "13"
//               ],
//               "answer": "12"
//           },
//           "q2": {
//               "question": "12 - 8 = ?",
//               "options": [
//                   "1",
//                   "2",
//                   "3",
//                   "4"
//               ],
//               "answer": "4"
//           }
//       }
//   }
// }
let add ={

}
add.srr=JSON.stringify(props.Auction);

//
console.log(props)
// let ggg = {};
// ggg.Auction = JSON.stringify(props.Auction);
// ggg.Contract = props.Contract;
// ggg.tokenID = JSON.stringify(props.tokenID);
// ggg.accountAddress = JSON.stringify(props.accountAddress);
// ggg.currentTime = JSON.stringify(props.currentTime);
// ggg.image = JSON.stringify(props.image);
// const eee = async () => {
//   let ggg = {
// Auction : props.Auction,
//  Contract : props.Contract,
//   tokenID : props.tokenID,
//   accountAddress : props.accountAddress,
// currentTime : props.currentTime,
//   image : props.image
// };
//     console.log(ggg)
//   //  console.log(ggg.Auction)
//   //  console.log(ggg.Contract)
//   //  console.log(ggg.tokenID)
//   //  console.log(ggg.accountAddress)
//   //  console.log(ggg.currentTime)
//   //  console.log(ggg.image)
//    const rere = await axios.post("http://localhost:8080/api/AuctionData", ggg);
//  }
 const [이미지, 이미지변경] = useState();

useEffect(() => {
  이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/image/${str}.jpg`);
}, [str]);
console.log(이미지)



    return (
    //   <Box width={800}>
    //   <Grid container spacing={2}>
    //     <Grid item>
    //       <DetailInfo
    //         image={image}
    //         auction={auction}
    //         ownerShipTrans={ownerShipTrans}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm container>
    //       <Grid item xs container direction="column">
    //         <Grid item xs={2}>
    //           <br />
    //           <Typography gutterBottom variant="h5">
    //             Token ID: {image.tokenID}
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={2}>
    //           <br />
    //           <Typography gutterBottom variant="h6" component="div">
    //             Image Name: {image.tokenName}
    //           </Typography>
    //         </Grid>
    //         <Grid item>
    //           <Typography gutterBottom variant="h6" component="div">
    //             Status: {status}
    //           </Typography>
    //         </Grid>
    //         <Grid item>
    //           {/* For Button */}
    //           {image.status == 0 ? // Hard to read I guess
    //             <div>
    //             <Button variant="개요" onClick={handleClickOpen}>
    //             입찰하다
    //             </Button>
    //             <Dialog open={open} onClose={handleClose}>
    //               <form onSubmit={putOnBid}>
    //                 <DialogTitle>입찰하다</DialogTitle>
    //                 <DialogContent>
    //                   <DialogContentText>
                       
    //       경매를 시작하려면 다음 정보를 입력하세요.
    //                   </DialogContentText>
    //                   <Box>
    //                     <TextField
    //                       label="Starting Bid"
    //                       type="number"
    //                       width={100}
    //                       variant="standard"
    //                       required
    //                       onChange={(e) => setMinBid( e.target.value )}
    //                     /><br />
    //                     <Select
    //                       defaultValue={1}
    //                       variant="standard"
    //                       onChange={(e) => setCurrenciesIU( e.target.value )}
    //                     >
    //                       <MenuItem value={1}>Wei</MenuItem>
    //                       <MenuItem value={1000000000000}>Szabo</MenuItem>
    //                     </Select>
    //                   </Box>
    //                   <Box>
    //                     <TextField
    //                       label="Durations"
    //                       type="number"
    //                       width={100}
    //                       variant="standard"
    //                       required
    //                       onChange={(e) => setDuration( e.target.value )}
    //                     /><br />
    //                     <Select
    //                       defaultValue={1}
    //                       variant="standard"
    //                       onChange={(e) => setTimesIU( e.target.value )}
    //                     >
    //                       <MenuItem value={1}>Second</MenuItem>
    //                       <MenuItem value={60}>Minute</MenuItem>
    //                       <MenuItem value={3600}>Hour</MenuItem>
    //                     </Select>
    //                   </Box>
    //                 </DialogContent>
    //                 <DialogActions>
    //                   <Button onClick={handleClose}>Cancel</Button>
    //                   <Button type="submit">Start</Button>
    //                 </DialogActions>
    //               </form>
    //             </Dialog>
    //           </div>
    //             : image.status == 1 ?
    //               leftTime > 0 ?
    //                 isOwner ?
    //                   <Button>
    //                   경매 종료 날짜 {leftTime}s</Button>
    //                   :  <div>
    //                   <Button variant="outlined" onClick={handleClickOpen}>
    //                    경매 종료 날짜{leftTime}s, Bid!!!
    //                   </Button>
    //                   <Dialog open={open} onClose={handleClose}>
    //                     <form onSubmit={bid}>
    //                       <DialogTitle>입찰하다</DialogTitle>
    //                       <DialogContent>
    //                         <DialogContentText>
    //                          입찰가를 채워주세요
    //                         </DialogContentText>
    //                         <TextField
    //                           label="Your Bid"
    //                           type="number"
    //                           width={100}
    //                           variant="standard"
    //                           required
    //                           onChange={(e) => setNewBid(e.target.value )}
    //                         /><br />
    //                         <Select
    //                           defaultValue={1}
    //                           variant="standard"
    //                           onChange={(e) => setCurrenciesIU(e.target.value )}
    //                         >
    //                           <MenuItem value={1}>Wei</MenuItem>
    //                           <MenuItem value={1000000000000}>Szabo</MenuItem>
    //                         </Select>
    //                       </DialogContent>
    //                       <DialogActions>
    //                         <Button onClick={handleClose}>Cancel</Button>
    //                         <Button type="submit">Bid</Button>
    //                       </DialogActions>
    //                     </form>
    //                   </Dialog>
    //                 </div>
    //                 : isOwner ?
    //                   <Button onClick={endOnBid}>이제 끝낼 수 있습니다.</Button>
    //                   : <Button>Time Up, 소유자가 종료하기를 기다리는 중.</Button>
    //               : <Button onClick={claim}>To be claimed</Button>
    //           }
    //           <span style={{ padding: "5px" }}></span>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    
    // </Box>
    <div>
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        {/* <Link href={{
            pathname: '/image/[id]',
            query: { books: "22" },
          }}
	    as={`/buysell/${encodeURIComponent(`image/${str}.jpg`)}`} // 주소창의 endpoint
        >
          <a>total: dd</a>
</Link>   */}



        <Grid container spacing={4}>
     

              <Link href={`/buysell/${encodeURIComponent(`image/${str}.jpg`)}?add=${props}`}>
                <Grid item key={`image/${str}.jpg`} xs={12} sm={6} md={4}>
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
                      image={이미지}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        뭐 딴 내용 들어갈거?
                      </Typography>
                      {/* <Typography>{a.Key}</Typography> */}
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                  </Grid>
                    </Link>
                </Grid>
            
      
    
      </Container>
    </ThemeProvider>
  </div>
    );
  
              

}

export default ImageCard;