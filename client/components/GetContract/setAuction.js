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
  styled,
  Stack,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { withRouter } from "next/router";
import { useForm } from "react-hook-form";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { fetchContract, fetchAuction } from "../../hooks";
import io from "socket.io-client";

import web3 from "../connection/web3";

import Market2 from "../market2";

const theme = createTheme();

const SetAuction = () => {
  const router = useRouter();

  console.log(router);
  const { id } = router.query;

  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions, setAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState("");
  const [ImagesId, setImagesId] = useState([]);

  const [b, seta] = useState(true);

  const tick = async () => {
    let currentTime = Date.parse(new Date()) / 1000;
    setCurrentTime(currentTime);
  };

  const [이미지, 이미지변경] = useState();

  const fromDb = id;
  let str = fromDb || `${id}`;

  console.log(str.slice(6, 52));
  str = str.slice(0, 52);
  console.log(str);

  const { data, isLoading, isFetching } = useQuery(["Auctiondata"], () =>
    fetchAuctiondata()
  );

  useEffect(() => {
    이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
  }, [id]);

  useEffect(() => {
    async function A() {
      let ImageNFTMarketplace = require("../../../build/contracts/ImageMarketplace.json");

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");

      let deployedNetwork = ImageNFTMarketplace.networks[networkId];

      let NFTMarketplaceInstance = new web3.eth.Contract(
        ImageNFTMarketplace.abi,
        deployedNetwork.address
      );

      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();

        console.log(ImageCount);
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods
            .imageStorage(i)
            .call();
          console.log(image);
          console.log(image.mintedBy);
          setImages((Images) => [...Images, image]);
          setImagesId(image.currentOwner);
          console.log(...Images, image[3]);
          let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
          setAuctions((Auctions) => [...Auctions, auction]);

          console.log(auction.endTime);
        }
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
      }
    }
    A();
  }, []);

  const [음악, 음악변경] = useState();
  const changeMusic = async (str) => {
    console.log(str);
    음악변경(`https://ipfs.io/ipfs/${str}`);
    console.log(`https://ipfs.io/ipfs/${str}`);
  };

  console.log(accountAddress);
  console.log(Images);
  const myImages = Images.filter(
    (image) =>
      image.currentOwner === accountAddress &&
      image.tokenURI === `https://ipfs.io/ipfs/${str}`
  );
  const allImages = Images.filter(
    (image) =>
      image.status != 0 &&
      accountAddress &&
      image.tokenURI === `https://ipfs.io/ipfs/${str}`
  );

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  console.log(ImagesId);
  console.log(myImages);
  if (accountAddress === ImagesId) {
    return (
      <div>
        <div>123</div>
        <ThemeProvider theme={theme}>
          <div>
            {" "}
            {myImages.map((image) => {
              return (
                <Item key={image.tokenID}>
                  <Market2
                    tokenID={image.tokenID}
                    image={image}
                    accountAddress={accountAddress}
                    Contract={Contract}
                    Auction={Auctions[parseInt(image.tokenID) - 1]}
                    currentTime={currentTime}
                  />
                </Item>
              );
            })}
          </div>
        </ThemeProvider>
        <div></div>
      </div>
    );
  } else {
    return (
      <div>
        <div>2</div>
        <ThemeProvider theme={theme}>
          <div>
            {" "}
            {allImages.map((image) => {
              return (
                <Item key={image.tokenID}>
                  <Market2
                    tokenID={image.tokenID}
                    image={image}
                    accountAddress={accountAddress}
                    Contract={Contract}
                    Auction={Auctions[parseInt(image.tokenID) - 1]}
                    currentTime={currentTime}
                  />
                </Item>
              );
            })}
          </div>
        </ThemeProvider>
        <div></div>
      </div>
    );
  }
};

// export default withRouter(SetAuction);
export default SetAuction;
