import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import {
  fetchBuyMusicDB,
  fetchUserDB,
  fetchBuyDB,
  fetchSetBuy,
  fetchOffer,
} from "../../hooks";
import { useState, useEffect } from "react";

import web3 from "../connection/web3";
import collectionContractJSON from "../../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../../build/contracts/NFTMarketplace.json";

import axios from "axios";

const theme = createTheme();

const SetBuy = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["setBuy"], () => fetchSetBuy(id));
    return result;
  };

  // 컨트랙트 처리 위해서
  const useUser2 = () => {
    const result = useQuery(["getOffer"], () => fetchOffer(id));
    return result;
  };

  // DB 가져다 쓰고 하려고
  const useUser3 = () => {
    const result = useQuery(["getBuyDB"], () => fetchBuyDB(id));
    return result;
  };

  // 유저 DB 가져다 쓰고 하려고
  const useUser4 = () => {
    const result = useQuery(["getUserDB"], () => fetchUserDB(id));
    return result;
  };

  // BuyMusic DB 가져다 쓰고 하려고
  const useUser5 = () => {
    const result = useQuery(["getBuyMusicDB"], () => fetchBuyMusicDB(id));
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();
  const data3 = useUser3();
  const data4 = useUser4();
  const data5 = useUser5();

  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(
      `https://const123.s3.ap-northeast-2.amazonaws.com/image/${id}.jpg`
    );

    async function upView() {
      const view = await axios.post("http://localhost:8080/api/upView", {
        CID: id,
      });
    }
    upView();
  }, [id]);

  let buyData;
  let a = 0;
  if (data1.data) {
    console.log(data1.data);
    a = 1;
    buyData = data1.data.data;
  }

  let b = 0;
  let offerData;
  if (data2.data) {
    b = 1;
    offerData = data2.data.data;
  }

  let c = 0;
  let buyDB;
  if (data3.data) {
    c = 1;
    buyDB = data3.data.data;
  }

  let d = 0;
  let userDB;
  if (data4.data) {
    d = 1;
    userDB = data4.data.data;
  }

  let e = 0;
  let buyMusicDB;
  if (data5.data) {
    e = 1;
    buyMusicDB = data5.data.data;
  }

  const likeHandler = async () => {
    const like = await axios.post("http://localhost:8080/api/upLike2", {
      CID: id,
    });
  };

  console.log("a", a);
  console.log("b", b);
  console.log("c", c);
  console.log("d", d);
  console.log("e", e);

  // 클라이언트 처리
  const [계정, 계정변경] = useState();

  console.log(계정);

  async function getGlobalAccounts() {
    const accounts2 = await web3.eth.getAccounts();
    계정변경(accounts2[0]);
  }

  useEffect(() => {
    getGlobalAccounts();
  }, []);

  console.log("패트", buyData);
  console.log("매트", offerData);

  const buyHandler = async (event) => {
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

    const setbuydb = await axios.post("http://localhost:8080/api/setBuyDB", {
      address: praaccounts[0],
      CID: buyData[0].img,
    });

    if (setbuydb) {
      console.log(setbuydb);
      // window.reload.href = "http://localhost:8080/constbuy";
    }

    // 메이크 오퍼의 offers 배열이 내가 오퍼한 개수, 오퍼한 것 중 나의 작품의 전체 순번이니까
    // offerId : 전체 오퍼한 개수 중 내 작품의 순번
    // _id : 전체 상품들 나열 중 내 작품의 번호 가져옴

    for (let i = 0; i < offerData.length; i++) {
      if (offerData[i].id == buyData[0].id) {
        pra2.methods
          .fillOffer(offerData[i].offerId)
          .send({
            from: praaccounts[0],
            value: offerData[i].price,
          })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
          })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      }
    }
  };

  const cancelHandler = async (event) => {
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

    for (let i = 0; i < offerData.length; i++) {
      if (offerData[i].id == buyData[0].id) {
        console.log(offerData[i]);
        pra2.methods
          .cancelOffer(offerData[i].offerId)
          .send({
            from: praaccounts[0],
          })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
          })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      }
    }
  };

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
    console.log(buyData[0].id);
    console.log(pra2.options.address);

    await pra.methods
      .approve(pra2.options.address, buyData[0].id)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해시해시", hash);
      })
      .on("receipt", (receipt) => {
        pra2.methods
          .makeOffer(buyData[0].id, enteredPrice)
          .send({ from: praaccounts[0] })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
          })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ m: 2 }} maxWidth="lg">
          {a === 1 && c === 1 && d === 1 && e === 1 ? (
            buyData.map((a) => (
              <Grid container spacing={5} textAlign="center">
                <Grid item xs={6}>
                  <Box p={2}>
                    <img
                      src={이미지}
                      height="500"
                      width="500"
                      object-Fit="fill"
                    ></img>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box p={2}>제목{buyDB.title}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box p={2}>판매자{userDB.id2}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box p={2}>조회수{buyDB.view}</Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box p={2}>좋아요{buyDB.LikeMusic}</Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box p={2}>에디션</Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box p={2}>
                        <Button
                          onClick={likeHandler}
                          fullWidth
                          variant="contained"
                        >
                          좋아요 누르기
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box p={2}>가격 {buyMusicDB.price}</Box>
                    </Grid>

                    {계정 === userDB.address ? (
                      <Grid item xs={4}>
                        <Box p={2}>
                          <Typography>본인의 상품입니다</Typography>
                          <Button
                            type="sumit"
                            fullWidth
                            onClick={cancelHandler}
                            variant="contained"
                          >
                            오퍼 취소하기
                          </Button>
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item xs={4}>
                        <Box p={2}>
                          <Button
                            onClick={buyHandler}
                            fullWidth
                            variant="contained"
                          >
                            구매하기
                          </Button>
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={4}>
                      <Box p={2}>
                        <Typography>찜하기</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Box p={2}>디테일 정보</Box>
                </Grid>
                <Grid item xs={4}>
                  <Box p={2}>저장 정보</Box>
                </Grid>
                <Grid item xs={4}>
                  <Box p={2}>가격 그래프</Box>
                </Grid>

                <Grid item xs={12}>
                  <Box p={2}>
                    여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이
                    날듯?
                  </Box>
                </Grid>
              </Grid>
            ))
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SetBuy;
