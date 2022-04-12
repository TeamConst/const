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
 
 
    </div>
  );
}