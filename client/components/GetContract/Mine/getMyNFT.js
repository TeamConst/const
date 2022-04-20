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
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchMyNFTDB, fetchMyNFT } from "../../../hooks";

import web3 from "../../connection/web3";
import collectionContractJSON from "../../../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../../../build/contracts/NFTMarketplace.json";

import io from "socket.io-client";

const theme = createTheme();

let param;

const GetMyNFT = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);

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

  const { data, isLoading, isFetching } = useQuery(["getMyNFTDB"], () =>
    fetchMyNFTDB()
  );

  let a = 0;
  let nftMyData = [];

  if (data) {
    a = 1;
    nftMyData = data.data;
  }

  console.log("dlrjqhwk", nftMyData);

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
        <Box sx={{ ...style, width: 200 }}>
          <Box>
            <ConfigBuy props={모달데이터}></ConfigBuy>
          </Box>
          {/* <Box>
            <ConfigEndBuy></ConfigEndBuy>
          </Box> */}
          <Box>
            <ConfigAuction props={모달데이터}></ConfigAuction>
          </Box>
          <Button onClick={handleClose}>닫기</Button>
        </Box>
      </Modal>

      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {a === 1 ? (
              nftMyData.map((a) => (
                // <Link href={`/buy/${encodeURIComponent(a.CID)}`}>
                <Grid item key={a.CID} xs={12} sm={6} md={4}>
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
                      제목
                      <Typography>{a.title}</Typography>
                      작곡가
                      <Typography>{a.composer}</Typography>
                      재생 횟수
                      <Typography>{a.playCount}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleOpen(a)}>
                        판매 & 경매 시작하기
                      </Button>
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
  console.log("여기요", props);
  const [buy, setBuy] = useState(false);

  const buyOpen = () => setBuy(true);
  const buyClose = () => setBuy(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      try {
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
        const deployedAddress2 =
          marketContractJSON.networks[networkId1].address;
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
                window.alert(
                  "Something went wrong when pushing to the blockchain"
                );
              });
          });

        console.log(props.props);
      } catch (err) {
        console.log(err);
      }

      try {
        const ax = await axios.post("http://localhost:8080/api/setBuyOffer", {
          CID: props.props.CID,
          address: praaccounts[0],
          price: data.price,
        });
      } catch (err) {
        console.log(err);
      }

      // window.location.href = "http://localhost:8080/mypage";
    } catch (err) {
      console.log(err);
    }
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">판매 시작하기</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-5 d-grid gap-2">
              <button type="submit" className="btn btn-secondary">
                오퍼하기
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
    </div>
  );
};

const ConfigAuction = (props) => {
  const [auction, setAuction] = useState(false);
  const auctionOpen = () => setAuction(true);
  const auctionClose = () => setAuction(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const ax = await axios.post("http://localhost:8080/api/setAuctionStart", {
        CID: props.props.CID,
      });
      window.location.href = "http://localhost:8080/mypage";
    } catch (err) {
      console.log(err);
    }
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">경매 시작하기</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-7">
              <button type="submit" className="btn btn-secondary">
                경매 고고
              </button>
            </div>
          </form>
          <Button onClick={auctionClose}>닫기</Button>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default GetMyNFT;
