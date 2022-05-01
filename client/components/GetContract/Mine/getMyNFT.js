import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchSelectedAuction, fetchMyNFTDB, fetchMyNFT } from "../../../hooks";

import web3 from "../../connection/web3";
import collectionContractJSON from "../../../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../../../build/contracts/NFTMarketplace.json";
import ImageMarketPlace from "../../../../build/contracts/ImageMarketplace.json";

import io from "socket.io-client";

const theme = createTheme();

let param;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const GetMyNFT = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);

  // get now accounts
  useEffect(() => {
    async function getNowAccount() {
      const accounts = await web3.eth.getAccounts();
      param = accounts[0];
    }
    getNowAccount();
  }, []);

  const { data, isLoading, isFetching } = useQuery(["getMyNFTDB"], () =>
    fetchMyNFTDB()
  );

  let a = 0;
  let nftMyData = [];

  if (data) {
    a = 1;
    nftMyData = data.data;
  }

  if (nftMyData) {
    for (let i = 0; i < nftMyData.length; i++) {
      nftMyData[i].auau = false;
      nftMyData[i].bubu = false;

      if (!nftMyData[i].AuctionMusic_CID[0]) {
        nftMyData[i].auau = true;
      } else if (nftMyData[i].AuctionMusic_CID[0].auctionComplete === true) {
        nftMyData[i].auau = true;
      }
      if (!nftMyData[i].BuyMusic_CID[0]) {
        nftMyData[i].bubu = true;
      } else if (nftMyData[i].BuyMusic_CID[0].buyComplete === true) {
        nftMyData[i].auau = true;
      }
    }
  }

  //  클라이언트에서 그대로 불러오기
  const [이미지, 이미지변경] = useState([]);

  const [open, setOpen] = useState(false);
  const [모달데이터, 모달데이터변경] = useState();

  const handleOpen = (data) => {
    모달데이터변경(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 200 }} textAlign="center">
          <Box>
            <ConfigBuy props={모달데이터}></ConfigBuy>
          </Box>

          <Box>
            <ConfigAuction props={모달데이터}></ConfigAuction>
          </Box>

          <Button onClick={handleClose}>닫기</Button>
        </Box>
      </Modal>

      <ThemeProvider theme={theme}>
        <Container sx={{ py: 2 }} maxWidth="xl">
          {/* <Typography variant="h4" component="h4" sx={{ m: 5 }}>
            나의 NFT 관리하기
          </Typography> */}
          <Grid container spacing={4} textAlign="center">
            {a === 1 ? (
              nftMyData.map((a) => (
                // <Link href={`/buy/${encodeURIComponent(a.CID)}`}>
                <Grid item key={a.CID} xs={4}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 0 }}>
                      <Typography> {a.artist}</Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{
                        height: "70%",
                        width: "100%",
                        objectFit: "fill",
                      }}
                      image={a.s3}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <div>{`${a.title}`}</div>
                      <Typography>{`재생 횟수  ${a.playCount}`}</Typography>
                    </CardContent>
                    <CardActions
                      align="center"
                      sx={{ justifyContent: "flex-end" }}
                    >
                      {a.auau === true && a.bubu === true ? (
                        <Button onClick={() => handleOpen(a)}>
                          판매 & 경매 시작하기
                        </Button>
                      ) : (
                        <div>
                          {a.auau === false ? (
                            <div>현재 경매 중인 상품입니다.</div>
                          ) : (
                            <div>현재 판매 중인 상품입니다.</div>
                          )}
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
                // </Link>
              ))
            ) : (
              <div>
                <h1>아님</h1>
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

const ConfigBuy = (props) => {
  const [buy, setBuy] = useState(false);

  const buyOpen = () => setBuy(true);
  const buyClose = () => setBuy(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // 컨트랙트
    // buy contract
    let pra;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();
    const deployedAddress1 =
      collectionContractJSON.networks[networkId1].address;
    const contract1 = new web3.eth.Contract(
      collectionContractJSON.abi,
      deployedAddress1
    );

    pra = contract1;
    praaccounts = accounts1;

    const ax = await axios.post("http://54.227.126.254:8080/api/setBuyOffer", {
      CID: props.props.CID,
      address: praaccounts[0],
      price: data.price,
    });
    console.log(ax);

    console.log("제발2");

    let pra2;
    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;

    // 오퍼
    const enteredPrice = web3.utils.toWei(data.price, "ether");
    // 바이데이터아이디는 내 작품의 전체 순번
    // console.log(buyData[0].id);

    console.log("제발3");

    await pra.methods
      .approve(pra2.options.address, props.props.idCount)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해시해시", hash);
      })
      .on("receipt", (receipt) => {
        pra2.methods
          .makeOffer(props.props.idCount, enteredPrice)
          .send({ from: praaccounts[0] })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
            alert("판매 등록 성공. 지금부터 판매를 시작합니다.");
            window.location.href = `http://54.227.126.254:8080/buy/${props.props.CID}`;

            // 일단 여기에 비동기로 하나 넣자
          })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      });

    console.log("제발4");

    // 캔슬
  };

  return (
    <div>
      <Button onClick={buyOpen}>판매 시작하기</Button>

      <Modal
        hideBackdrop
        open={buy}
        onClose={buyClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }} textAlign="center">
          <h2 id="child-modal-title">판매 시작하기</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-7">
              <input
                {...register("price", {
                  required: true,
                })}
                type="number"
                step="0.01"
                placeholder="ETH..."
                className="form-control"
              ></input>
            </div>

            <button type="submit" className="btn btn-secondary">
              오퍼하기
            </button>
          </form>

          <Button onClick={buyClose}>닫기</Button>
        </Box>
      </Modal>
    </div>
  );
};

const ConfigAuction = (props) => {
  const [auction, setAuction] = useState(false);
  const auctionOpen = () => setAuction(true);
  const auctionClose = () => setAuction(false);

  const { data, isLoading, isFetching } = useQuery(["getSelectedAuction"], () =>
    fetchSelectedAuction(props.props.CID)
  );

  let auctionData = [];
  if (data) {
    auctionData = data.data;
  }

  const [currenciesIU, setCurrenciesIU] = useState(1);
  const [timesIU, setTimesIU] = useState(1);
  const [minBid, setMinBid] = useState(0);
  const [duration, setDuration] = useState(0);

  let minBid2 = minBid * currenciesIU;
  let duration2 = duration * timesIU;

  const putOnBid = async () => {
    let pra;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();
    const deployedAddress1 = ImageMarketPlace.networks[networkId1].address;
    const contract1 = new web3.eth.Contract(
      ImageMarketPlace.abi,
      deployedAddress1
    );

    pra = contract1;
    praaccounts = accounts1;

    const ax = await axios.post("http://54.227.126.254:8080/api/setAuctionStart", {
      CID: props.props.CID,
      currentPrice: minBid2,
      duration: duration2,
    });

    /// 판매 개시(소유자라고도 하는 판매자)
    await pra.methods
      .beginAuction(auctionData[0].tokenID, minBid2, duration2)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해시해시", hash);
        alert("경매 등록 성공. 지금부터 경매를 시작합니다.");
        window.location.href = `http://54.227.126.254:8080/auction/${props.props.CID}`;
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });
  };

  return (
    <div>
      <Button onClick={auctionOpen}>경매 시작하기</Button>

      <Modal
        hideBackdrop
        open={auction}
        onClose={auctionClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }} textAlign="center">
          <h2 id="child-modal-title">경매 시작하기</h2>

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
                onChange={(e) => setMinBid(e.target.value)}
              />
              <br />
              <Select
                defaultValue={1}
                variant="standard"
                onChange={(e) => setCurrenciesIU(e.target.value)}
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
                onChange={(e) => setDuration(e.target.value)}
              />
              <br />
              <Select
                defaultValue={1}
                variant="standard"
                onChange={(e) => setTimesIU(e.target.value)}
              >
                <MenuItem value={1}>Second</MenuItem>
                <MenuItem value={60}>Minute</MenuItem>
                <MenuItem value={3600}>Hour</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <Button onClick={() => putOnBid()}>Start</Button>

          <Button onClick={auctionClose}>닫기</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GetMyNFT;
