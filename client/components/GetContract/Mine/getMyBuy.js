// 서버 페칭만 써볼 거에요 이 컴포넌트는
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
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import React, { useState, useEffect } from "react";
import { fetchMyBuy } from "../../../hooks";
import io from "socket.io-client";

import axios from "axios";
import Link from "next/link";

import web3 from "../../connection/web3";
import collectionContractJSON from "../../../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../../../build/contracts/NFTMarketplace.json";

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfigBuy = (props) => {
  console.log("여기요", props);
  const [buy, setBuy] = React.useState(false);

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

    let pra2;
    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;

    // 오퍼
    const enteredPrice = web3.utils.toWei(data.price, "ether");
    console.log(praaccounts[0]);
    // 바이데이터아이디는 내 작품의 전체 순번
    // console.log(buyData[0].id);
    console.log(pra2.options.address);

    await pra.methods
      .approve(pra2.options.address, props.props.id)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해시해시", hash);
      })
      .on("receipt", (receipt) => {
        pra2.methods
          .makeOffer(props.props.id, enteredPrice)
          .send({ from: praaccounts[0] })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
            // 일단 여기에 비동기로 하나 넣자
          })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      });
    const ax = await axios.post("http//54.227.126.254:8080/api/setBuyOffer", {
      CID: props.props.img,
      address: praaccounts[0],
      price: data.price,
    });

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
        <Box sx={{ ...style2, width: 200 }}>
          <h2 id="child-modal-title">구매구매 랄라</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-5 d-grid gap-2">
              <button type="submit" className="btn btn-secondary">
                OFFER
              </button>
            </div>
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
          </form>

          <Button onClick={buyClose}>닫기</Button>
        </Box>
      </Modal>

      {/* <div className="row">
          <div className="d-grid gap-2 col-5 mx-auto">
            <button onClick={cancelHandler} className="btn btn-danger">
              CANCEL
            </button>
          </div>
        </div> */}
    </div>
  );
};

const ConfigAuction = () => {
  const [auction, setAuction] = React.useState(false);
  const auctionOpen = () => setAuction(true);
  const auctionClose = () => setAuction(false);

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
        <div>
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">라랄라</h2>
          </Box>

          <Button onClick={auctionClose}>닫기</Button>
        </div>
      </Modal>
    </div>
  );
};

let param;

const GetMyBuy = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("라우터", router);
  // get now accounts
  useEffect(() => {
    async function getNowAccount() {
      const accounts = await web3.eth.getAccounts();
      console.log("이거 왜", accounts[0]);
      param = accounts[0];
      console.log("pp", param);
    }
    getNowAccount();
  }, []);

  const { data, isLoading, isFetching } = useQuery(["getMyBuy"], () =>
    fetchMyBuy(param)
  );

  // const socketClient = io("http://local:3000");

  console.log("param2", param);
  // 서버에서 받기
  // socketClient.on("refreshAuction", (req) => {
  //   console.log("서버에서 refreshAuction 받기 성공");
  //   // queryClient.invalidateQueries("getAuctions");
  // });

  let a = 0;
  let buyData = [];
  let b;
  let c;

  if (data) {
    a = 1;
    for (let i = 0; i < data.data.length; i++) {
      buyData[i] = data.data[i];
      buyData[
        i
      ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].img}.jpg`;
    }
  }
  console.log(data);
  console.log(buyData);

  const [open, setOpen] = React.useState(false);
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
        <div>
          <Box>
            <ConfigBuy props={모달데이터}></ConfigBuy>
          </Box>
          {/* <Box>
            <ConfigEndBuy></ConfigEndBuy>
          </Box> */}
          <Box>
            <ConfigAuction></ConfigAuction>
          </Box>

          <Button onClick={handleClose}>닫기</Button>
        </div>
      </Modal>

      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {a === 1 ? (
              buyData.map((a) => (
                // <Link href={`/buy/${encodeURIComponent(a.img)}`}>
                <Grid item key={a.img} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={a.s3}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      ID
                      <Typography>{a.id}</Typography>
                      CID
                      <Typography>{a.img}</Typography>
                      Owner
                      <Typography>{a.owner}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                      <Button onClick={() => handleOpen(a)}>Open modal</Button>
                    </CardActions>
                  </Card>
                </Grid>
                // </Link>
              ))
            ) : (
              <div>
                <CircularProgress />
              </div>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default GetMyBuy;
