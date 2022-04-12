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
  

    console.log(image.status)
    console.log(image[2])
    const fromDb = image[2];
  let str = fromDb || `${fromDb}`;

console.log(str.slice(21))
str = str.slice(21)
console.log(str)

let add ={

}
add.srr=JSON.stringify(props.Auction);

//
console.log(props.accountAddress)

 const [이미지, 이미지변경] = useState();

useEffect(() => {
  이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/image/${str}.jpg`);
}, [str]);
console.log(이미지)



let onBid = (image.status == 1);
let toBeClaim = (image.status == 2);
    return (

    <div>
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 8 }} maxWidth="md">


        <Grid container spacing={4}>
     

              <Link href={`/buysell/${encodeURIComponent(`image/${str}.jpg`)}?add=${props.accountAddress}`}>
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