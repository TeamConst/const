import React from 'react';
import {
  Button, ButtonBase, Typography, TextField, Paper, Grid, styled, Box,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

export default function DetailInfo({
  image,
  auction,
  ownerShipTrans
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  let onBid = (image.status == 1);
  let toBeClaim = (image.status == 2);
  
  return (
    <div>
      <ButtonBase onClick={handleClickOpen} sx={{ width: 328, height: 226 }}>
        <Img alt="NFT Images" src={image.tokenURI} />
      </ButtonBase>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Grid item xs container direction="column">
            <Grid item>
              {/* <Img alt="NFT Images" src={image.tokenURI} /> */}
            </Grid>
            <Grid item>
              <Typography variant="h5">
              세부 정보
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Name: {image.tokenName}
                <br />
                {/* Highest Auction Price: {window.web3.utils.fromWei(`${image.highestBidPrice}`, 'ether')} ETH */}
                <br />
                Minted By: {image.mintedBy}
                <br />
                Owner: {image.currentOwner}
                <br /><br />
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
              소유권 경로
              </Typography>
              {ownerShipTrans.map((address, index) => {
                return (
                  <Typography variant="body2" color="text.secondary" key={index}>{address} -&gt;</Typography>
                );
              })}
              <Typography variant="body2" color="text.secondary">(Current)<br /><br /></Typography>
            </Grid>
            {onBid || toBeClaim ?
              <Grid item>
                {onBid ?
                  <Typography variant="h5" color="red">
                    경매 중
                  </Typography>
                  : <Typography variant="h5" color="green">
                    청구 대상
                  </Typography>
                }
                {/* <Typography variant="body2" color="text.secondary">
                입찰 시작: {window.web3.utils.fromWei(`${auction.startBid}`, 'ether')} ETH
                  <br />
                  현재 입찰가: {window.web3.utils.fromWei(`${auction.highestBid}`, 'ether')} ETH
                  <br />
                  현재 우승자: {auction.winner}
                  <br /><br />
                </Typography> */}
              </Grid>
              : <div />
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>완료</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}