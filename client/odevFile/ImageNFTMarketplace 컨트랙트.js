import { useForm } from "react-hook-form";

import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
//web3
import Web3 from "web3";
import Marketplace from "../components/Marketplace";
import MintedImages from "../components/MintedImages";
// import web3 from "./connection/web3";
// import contractJSON from "../../build/contracts/NFTCollection.json";

// import axios from "axios";

const theme = createTheme();
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

async function setupWeb3() {
  console.log("hihi");
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
  // Fallback to local; use dev console port by default...
  else {
    console.alert(
      "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
    );
  }
}
function AuctionMint() {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions, setAuctions] = useState([]);
  const [Auctions2, setAuctions2] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState(false);

  const [a, seta] = useState(true);

  const setupBlockchain = async () => {
    seta(false);
    let ImageNFTMarketplace = {};

    try {
      ImageNFTMarketplace = require("../../build/contracts/ImageMarketplace.json");
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
      const deployedNetwork = null;

      // Create instance of contracts

      console.log("networkId", networkId);

      console.log("ImageNFTMarketplace.networks", ImageNFTMarketplace.networks);
      if (ImageNFTMarketplace.networks) {
        deployedNetwork = ImageNFTMarketplace.networks[networkId];
        console.log("deployedNetwork", deployedNetwork);
        if (deployedNetwork) {
          NFTMarketplaceInstance = new web3.eth.Contract(
            ImageNFTMarketplace.abi,
            deployedNetwork.address
          );
        }
      }
      console.log("ImageNFTMarketplace", ImageNFTMarketplace.networks);
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
          let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
          setAuctions((Auctions) => [...Auctions, auction]);
          setAuctions((Auctions) => [...Auctions, auction]);
          console.log("Auctions", Auctions);
          console.log("Auctions", auction);
        }
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
        setReady(true);
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
    if (a == true) {
      setReady(false);
      setupWeb3();
      setupBlockchain();
    }
  })();

  const [NFTName, setNFTName] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");

  const captureFile = async ({ target }) => {
    console.log(target.files[0]);
    if (target.files && target.files[0]) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = async () => {
        let imageData = Buffer(reader.result);
        // let fileObj = new File([imageData], target.files[0].name, {
        // 	type: "image/*",
        // });
        setBuffer(imageData);
        console.log(imageData);
      };
    }
  };

  async function onSubmit(event) {
    event.preventDefault();
    console.log(buffer);
    const result = await ipfs.add(buffer);
    console.log(result);
    // IPFS 업로드에 성공한 경우
    console.log(result.path);
    setIpfsHash(result.path);
    console.log();
    console.log("ipfsHash", result.path);
    console.log(`https://ipfs.infura.io/ipfs/${result.path}`);

    const tokenURI = `https://ipfs.infura.io/ipfs/${result.path}`;
    setTokenURI(tokenURI);
    console.log("=== tokenURI ===", tokenURI);

    // await props.Contract.methods.mintImageNFT(NFTName, result.path).send({ from: props.accountAddress });
    await Contract.methods
      .mintImageNFT(NFTName, result.path)
      .send({ from: accountAddress });
    console.log(Contract);
    console.log("=== Mint ===", NFTName);
    window.location.reload(true);
  }
  console.log(Auctions);
  console.log(ready);
  console.log(accountAddress);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    음원 등록
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <TextField
                      required
                      accept="image/*"
                      type="file"
                      sx={{ m: 3, width: "35ch" }}
                      onChange={captureFile}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          required
                          type="text"
                          value={NFTName}
                          label="NFT's Name"
                          sx={{ m: 3, width: "35ch" }}
                          onChange={(e) => setNFTName(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="가수명"
                        //   autoFocus
                        //   {...register("artist", {
                        //     required: true,
                        //     maxLength: 80,
                        //   })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="앨범명"
                          autoFocus
                          {...register("albumName", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="발매년도"
                        //   autoFocus
                        //   {...register("albumYear", {
                        //     required: true,
                        //     maxLength: 80,
                        //   })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="장르"
                          autoFocus
                        //   {...register("genre", {
                        //     required: true,
                        //     maxLength: 80,
                        //   })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="작곡가"
                        //   autoFocus
                        //   {...register("albumGakkok", {
                        //     required: true,
                        //     maxLength: 80,
                        //   })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="작사가"
                        //   autoFocus
                        //   {...register("albumGaksa", {
                        //     required: true,
                        //     maxLength: 80,
                        //   })}
                        />
                      </Box> */}
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        음원(파일)
                        <input
                          {...register("musics", {
                            required: true,
                          })}
                          type="file"
                        ></input>
                      </Box> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </main>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              음원 등록
            </Button>
          </Container>
        </ThemeProvider>
      </form>
      <MintedImages
        accountAddress={accountAddress}
        Images={Images}
        ImageNumOfAccount={ImageNumOfAccount}
        Contract={Contract}
        Auctions={Auctions}
        currentTime={currentTime}
      />
      <br />
      {/* <Marketplace
          accountAddress={accountAddress}
          Images={Images}
          Contract={Contract}
          Auctions={Auctions}
          currentTime={currentTime}
        /> */}
      {/* <RenderMintedImages/> */}
      {/* <RenderMarketplace/> */}
    </div>
  );
}

export default AuctionMint;
