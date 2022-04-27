import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchBestCollections } from "../hooks";
import { fetchAuctiondata } from "../hooks";
import { useState, useEffect, useCallback } from "react";
import AudioPlayer from "react-h5-audio-player";
import MintedImages from "../components/MintedImages";
import { withRouter } from "next/router";
import DetailInfo from "../components/ImageCard/DetailInfo";
import { Typography, Stack, Paper, styled } from "@mui/material";
import { Button, TextField, MenuItem, Select, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AuctionMint from "./Auction/AuctionMint";
import Market2 from "../components/market2";
import ImageCard from "../components/ImageCard/ImageCard";

import web3 from "../components/connection/web3";

const theme = createTheme();

// async function setupWeb3() {
//   console.log("hihid");
//   if (window.ethereum) {
//     console.log("확인");
//     window.web3 = new Web3(window.ethereum);
//     // Request account access if needed
//     window.ethereum.send("eth_requestAccounts");
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//     // Use Mist/MetaMask's provider.
//     window.web3 = new Web3(window.web3.currentProvider);
//     console.log("주입된 web3가 감지되었습니다.");
//   }
//   // Fallback to localhost; use dev console port by default...
//   else {
//     console.alert(
//       "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
//     );
//   }
// }

const Market = (props) => {
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
  // const setupBlockchain = async () => {
  //   seta(false);
  //   let ImageNFTMarketplace = {};

  //   try {
  //     ImageNFTMarketplace = require("../../build/contracts/ImageMarketplace.json");
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   try {
  //     // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
  //     const web3 = window.web3;
  //     const accounts = await web3.eth.getAccounts();

  //     console.log(accounts);
  //     // Get the contract instance.
  //     let balance =
  //       accounts.length > 0
  //         ? await web3.eth.getBalance(accounts[0])
  //         : await web3.utils.toWei("0");
  //     balance = await web3.utils.fromWei(balance, "ether");
  //     const networkId = await web3.eth.net.getId();
  //     let NFTMarketplaceInstance = null;
  //     let deployedNetwork = null;

  //     // Create instance of contracts
  //     if (ImageNFTMarketplace.networks) {
  //       deployedNetwork = ImageNFTMarketplace.networks[networkId];
  //       if (deployedNetwork) {
  //         NFTMarketplaceInstance = new web3.eth.Contract(
  //           ImageNFTMarketplace.abi,
  //           deployedNetwork.address
  //         );
  //       }
  //     }
  //     console.log("ImageNFTMarketplace", ImageNFTMarketplace);
  //     console.log("deployedNetwork", deployedNetwork);
  //     console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);

  //     if (NFTMarketplaceInstance) {
  //       const ImageCount = await NFTMarketplaceInstance.methods
  //         .currentImageCount()
  //         .call();

  //       console.log(ImageCount);
  //       for (let i = 1; i <= ImageCount; i++) {
  //         let image = await NFTMarketplaceInstance.methods
  //           .imageStorage(i)
  //           .call();
  //         console.log(image);
  //         console.log(image.mintedBy);
  //         setImages((Images) => [...Images, image]);
  //         setImagesId(image.currentOwner);
  //         console.log(...Images, image[3]);
  //         let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
  //         setAuctions((Auctions) => [...Auctions, auction]);

  //         console.log(auction.endTime);
  //       }
  //       let ImageNumOfAccount = await NFTMarketplaceInstance.methods
  //         .getOwnedNumber(accounts[0])
  //         .call();
  //       setContract(NFTMarketplaceInstance);
  //       setAccountAddress(accounts[0]);
  //       setAccountBalance(balance);
  //       setImageCount(ImageCount);
  //       setImageNumOfAccount(ImageNumOfAccount);
  //     } else throw "스마트 연락처에 연결하지 못했습니다.";
  //   } catch (error) {
  //     // 위의 작업에 대한 오류를 포착합니다.
  //     alert(
  //       "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
  //     );
  //     console.error(error);
  //   }
  // };

  const tick = async () => {
    let currentTime = Date.parse(new Date()) / 1000;
    setCurrentTime(currentTime);
  };

  const router = useRouter();
  const { id } = router.query;
  const { add } = router.query;
  const [이미지, 이미지변경] = useState();
  console.log({ id });
  console.log({ add });

  const fromDb = id;
  let str = fromDb || `${id}`;

  console.log(str.slice(6, 52));
  str = str.slice(6, 52);
  console.log(str);

  const { data, isLoading, isFetching } = useQuery(["Auctiondata"], () => fetchAuctiondata());

  useEffect(() => {
    이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
  }, [id]);

  useEffect(() => {
    async function A() {
      let ImageNFTMarketplace = require("../../build/contracts/ImageMarketplace.json");

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]) : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");

      let deployedNetwork = ImageNFTMarketplace.networks[networkId];

      let NFTMarketplaceInstance = new web3.eth.Contract(ImageNFTMarketplace.abi, deployedNetwork.address);

      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods.currentImageCount().call();

        console.log(ImageCount);
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods.imageStorage(i).call();
          console.log(image);
          console.log(image.mintedBy);
          setImages((Images) => [...Images, image]);
          setImagesId(image.currentOwner);
          console.log(...Images, image[3]);
          let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
          setAuctions((Auctions) => [...Auctions, auction]);

          console.log(auction.endTime);
        }
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods.getOwnedNumber(accounts[0]).call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
      }
    }
    A();
  }, []);

  // (async function componentWillMount() {
  //   if (b == true) {
  //     // setReady(false);
  //     setupWeb3();
  //     setupBlockchain();
  //     tick();
  //   }
  // })();

  const [음악, 음악변경] = useState();
  const changeMusic = async (str) => {
    console.log(str);
    음악변경(`https://ipfs.io/ipfs/${str}`);
    console.log(`https://ipfs.io/ipfs/${str}`);
  };
  // let musics;
  // let a = 0;
  // let mintby=[];
  // console.log(data)
  // if (data) {
  //   a = 1;
  //   musics = data.data;
  //   console.log(musics)
  //   for(let i=0; i < musics.length;i++){
  //     if(musics[i].CID === str){
  //       mintby[i] = musics[i].mintby
  //     }
  //   }
  // }

  console.log(Images);
  const myImages = Images.filter((image) => image.currentOwner === accountAddress && image.tokenURI === `https://ipfs.io/ipfs/${str}`);
  const allImages = Images.filter((image) => image.status != 0 && accountAddress && image.tokenURI === `https://ipfs.io/ipfs/${str}`);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  console.log(ImagesId);
  if (accountAddress === ImagesId) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            {" "}
            {myImages.map((image) => {
              return (
                <Item key={image.tokenID}>
                  <Market2 tokenID={image.tokenID} image={image} accountAddress={accountAddress} Contract={Contract} Auction={Auctions[parseInt(image.tokenID) - 1]} currentTime={currentTime} />
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
        <div></div>
        <ThemeProvider theme={theme}>
          <div>
            {" "}
            {allImages.map((image) => {
              return (
                <Item key={image.tokenID}>
                  <Market2 tokenID={image.tokenID} image={image} accountAddress={accountAddress} Contract={Contract} Auction={Auctions[parseInt(image.tokenID) - 1]} currentTime={currentTime} />
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

export default withRouter(Market);
