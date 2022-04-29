import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
// import { fetchLocals } from "../hooks/locals";
import { useEffect, useState } from "react";
// import web3 from "../components/connection/web3";
// import MintedImages from "../MintedImages/index";
// import { fetchBestCollections } from "../hooks";
// import axios from "axios";
//
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
//
import Link from "next/link";
import Marketplace from "../Marketplace";
//
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import ImageCard from "./ImageCard/ImageCard";
import Web3 from "web3";
//
const theme = createTheme();

async function setupWeb3() {
  console.log("hihid");
  if (window.ethereum) {
    console.log("확인");
    window.web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum.send("eth_requestAccounts");
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("주입된 web3가 감지되었습니다.");
  }
  // Fallback to localhost; use dev console port by default...
  else {
    console.alert(
      "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
    );
  }
}
const AuctionCollection = () => {
  const [Auctions, setAuctions] = useState([]);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);

  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState(false);
  const [b, seta] = useState(true);

  const setupBlockchain = async () => {
    seta(false);
    let ImageNFTMarketplace = {};

    try {
      ImageNFTMarketplace = require("../../../build/contracts/ImageMarketplace.json");
    } catch (e) {
      console.log(e);
    }
    try {
      // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);
      // Get the contract instance.
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");

      console.log("balance", balance);

      const networkId = await web3.eth.net.getId();
      let NFTMarketplaceInstance = null;
      let deployedNetwork = null;

      // Create instance of contracts

      console.log("networkId", networkId);

      if (ImageNFTMarketplace.networks) {
        deployedNetwork = ImageNFTMarketplace.networks[networkId];
        if (deployedNetwork) {
          NFTMarketplaceInstance = new web3.eth.Contract(
            ImageNFTMarketplace.abi,
            deployedNetwork.address
          );
        }
      }

      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();
        for (let i = 1; i <= ImageCount; i++) {
          const auction = await NFTMarketplaceInstance.methods
            .auctions(i)
            .call();
          setAuctions((Auctions) => [...Auctions, auction]);
          console.log("auctions", Auctions);
        }
      }
      console.log("ImageNFTMarketplace", ImageNFTMarketplace);
      console.log("deployedNetwork", deployedNetwork);
      console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);
      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods
            .imageStorage(i)
            .call();
          setImages((Images) => [...Images, image]);
          const auction = await NFTMarketplaceInstance.methods
            .auctions(i)
            .call();
          setAuctions((Auctions) => [...Auctions, auction]);
          console.log("auctions", Auctions);
          setContract(NFTMarketplaceInstance);
        }
        console.log(Auctions[2]);
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();

        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
        // setReady(true)
      } else throw "스마트 연락처에 연결하지 못했습니다.";
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
      );
      console.error(error);
    }
  };

  (async function componentWillMount() {
    if (b == true) {
      setReady(false);
      setupWeb3();
      setupBlockchain();
    }
  })();

  console.log(Contract);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  마켓플레이스
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  경매장
                  <Marketplace
                    accountAddress={accountAddress}
                    Images={Images}
                    ImageNumOfAccount={ImageNumOfAccount}
                    Contract={Contract}
                    Auctions={Auctions}
                    currentTime={currentTime}
                  />
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
      <br />
      <div>
        <div>
          <ThemeProvider theme={theme}>
            <Container sx={{ py: 8 }} maxWidth="md"></Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default AuctionCollection;
