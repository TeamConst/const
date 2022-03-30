import React,{useState,useEffect} from 'react';
import {
  Button, Typography, Grid, Box, TextField, MenuItem, Select, InputLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
// import Loader from '../Loader';
import DetailInfo from './DetailInfo';

function ImageCard (props) {
      //
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
    return (
      <Box width={800}>
      <Grid container spacing={2}>
        <Grid item>
          <DetailInfo
            image={image}
            auction={auction}
            ownerShipTrans={ownerShipTrans}
          />
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
                      <Button onClick={endOnBid}>이제 끝낼 수 있습니다.</Button>
                      : <Button>Time Up, 소유자가 종료하기를 기다리는 중.</Button>
                  : <Button onClick={claim}>To be claimed</Button>
              }
              <span style={{ padding: "5px" }}></span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    );
  
              

}

export default ImageCard;