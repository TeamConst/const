import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Web3 from "web3";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchBestCollections } from "../hooks";
import { fetchBuySell } from "../hooks";
import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import MintedImages from "../components/MintedImages";
import { withRouter } from "next/router";
import DetailInfo from "../components/ImageCard/DetailInfo";
import { Typography, Stack, Paper, styled } from "@mui/material";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AuctionMint from "./Auction/AuctionMint";

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
  // Fallback to 54.227.126.254; use dev console port by default...
  else {
    console.alert(
      "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
    );
  }
}

const AuctionImageCard = (props) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions, setAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState(false);
  const [ImagesId, setImagesId] = useState([]);

  const [b, seta] = useState(true);
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
      const networkId = await web3.eth.net.getId();
      let NFTMarketplaceInstance = null;
      let deployedNetwork = null;

      // Create instance of contracts
      if (ImageNFTMarketplace.networks) {
        deployedNetwork = ImageNFTMarketplace.networks[networkId];
        if (deployedNetwork) {
          NFTMarketplaceInstance = new web3.eth.Contract(
            ImageNFTMarketplace.abi,
            deployedNetwork.address
          );
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
          setImagesId(image[3]);
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
      } else throw "스마트 연락처에 연결하지 못했습니다.";
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
      );
      console.error(error);
    }
  };

  const tick = async () => {
    let currentTime = Date.parse(new Date()) / 1000;
    setCurrentTime(currentTime);
  };

  (async function componentWillMount() {
    if (b == true) {
      setReady(false);
      setupWeb3();
      setupBlockchain();
      tick();
    }
  })();

  const router = useRouter();
  const { id } = router.query;
  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
  }, [id]);

  const { data, isLoading, isFetching } = useQuery(["buysell"], () =>
    fetchBuySell(id)
  );
  let abcd;
  let a;
  if (data) {
    a = 1;
    abcd = data.data.dataValues;
    console.log(data.data.dataValues);
  }

  const fromDb = id;
  let str = fromDb || `${id}`;

  console.log(str.slice(6, 52));
  str = str.slice(6, 52);
  console.log(str);
  const [음악, 음악변경] = useState();
  const changeMusic = async (str) => {
    console.log(str);
    음악변경(`https://ipfs.infura.io/ipfs/${str}`);
    console.log(`https://ipfs.infura.io/ipfs/${str}`);
  };

  const allImages = Images.filter(
    (image) =>
      image.currentOwner !== accountAddress &&
      accountAddress &&
      image.tokenURI === `https://ipfs.infura.io/ipfs/${str}`
  );

  const myImages = Images.filter(
    (image) =>
      image.currentOwner === accountAddress &&
      image.tokenURI === `https://ipfs.infura.io/ipfs/${str}`
  );

  {
    /* 소유한 NFTS의 총 수:{ImageNumOfAccount} */
  }
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  }));
  console.log(ImagesId);
  console.log(accountAddress);
  console.log(Auctions);
  useEffect(() => {
    const Auction = Auctions.filter((Auction) => {
      if (Auction[3] === accountAddress) {
        setImagesId(Auction[3]);
      }
    });
    [];
  });
  console.log(ImagesId);

  // 1 => 자기
  // 2 => 다른
  if (ImagesId === accountAddress) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    사진
                    <img src={이미지} height="300" width="300"></img>
                  </Box>
                </Grid>
                {a === 1 ? (
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          제목{abcd.title}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          판매자{abcd.artist}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          조회수{abcd.playCount}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          좋아요{abcd.LikeMusic}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          에디션
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          가격 옥션에 대한 db 추가해야함
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          수량
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          구매
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          bgcolor="info.main"
                          color="info.contrastText"
                          p={2}
                        >
                          선물
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <h1>아님</h1>
                )}

                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    디테일 정보
                    {str}
                  </Box>
                  <AudioPlayer
                    autoPlay
                    src={`https://ipfs.infura.io/ipfs/${str}`}
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    저장 정보
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    가격 그래프
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    빈칸
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    <Stack
                      elevation={12}
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {myImages.map((image) => {
                        console.log(image);
                        return (
                          <Item key={image.tokenID}>
                            <AuctionMint
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
                    </Stack>
                  </Box>
                  <div></div>
                </Grid>
                <Grid item xs={12}>
                  <Box bgcolor="info.main" color="info.contrastText" p={2}>
                    여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이
                    날듯?
                  </Box>
                </Grid>
              </Grid>
            </main>
          </Container>
        </ThemeProvider>
        <div></div>
      </div>
    );
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진
                  <img src={이미지} height="300" width="300"></img>
                </Box>
              </Grid>
              {a === 1 ? (
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        제목{abcd.title}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        판매자{abcd.artist}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        조회수{abcd.playCount}
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        좋아요{abcd.LikeMusic}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        에디션
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        가격 옥션에 대한 db 추가해야함
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        수량
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        구매
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box bgcolor="info.main" color="info.contrastText" p={2}>
                        선물
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <h1>아님</h1>
              )}

              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  디테일 정보
                  {str}
                </Box>
                <AudioPlayer
                  autoPlay
                  src={`https://ipfs.infura.io/ipfs/${str}`}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  저장 정보
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  가격 그래프
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  빈칸
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  <Stack
                    elevation={12}
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {allImages.map((image) => {
                      return (
                        <Item key={image.tokenID}>
                          <AuctionMint
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
                </Box>
                <div></div>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이 날듯?
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
      <div></div>
    </div>
  );
};

export default AuctionImageCard;
