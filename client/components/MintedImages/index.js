import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Typography, Stack, Paper, styled } from "@mui/material";
import Market from "../market";
// import Router from "next/router";
// import Link from "next/link";
// import { Switch } from "@mui/material";
// import Route from

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MintedImages({
  accountAddress,
  Images,
  ImageNumOfAccount,
  Contract,
  Auctions,
  currentTime,
}) {
  console.log(Images);
  console.log("Auctions", Auctions);
  const myImages = Images.filter(
    (image) => image.currentOwner === accountAddress
  );
  return (
    <div>
      <br />
      <h2>{/* 소유한 NFTS의 총 수:{ImageNumOfAccount} */}</h2>
      <hr />
      <br />
      <Stack
        elevation={12}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {myImages.map((image) => {
          return (
            <Item key={image.tokenID}>
              <ImageCard
                tokenID={image.tokenID}
                image={image}
                accountAddress={accountAddress}
                Contract={Contract}
                Auction={Auctions[parseInt(image.tokenID) - 1]}
                currentTime={currentTime}
              />
              {/* <Market/> */}
            </Item>
          );
        })}
      </Stack>
    </div>
  );
}

export default MintedImages;
