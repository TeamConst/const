import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { fetchSetBuy, fetchOffer } from "../hooks";
import { useState, useEffect } from "react";

import web3 from "./connection/web3";
import collectionContractJSON from "../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../build/contracts/NFTMarketplace.json";

const theme = createTheme();

const SetBuy = () => {
  const router = useRouter();
  const { id } = router.query;

  const useUser1 = () => {
    const result = useQuery(["setBuy"], () => fetchSetBuy(id));
    return result;
  };
  const useUser2 = () => {
    const result = useQuery(["getOffer"], () => fetchOffer(id));
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(
      `https://const123.s3.ap-northeast-2.amazonaws.com/image/${id}.jpg`
    );
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

  // 클라이언트 처리
  const [계정, 계정변경] = useState();

  console.log(계정);

  async function getGlobalAccounts() {
    const accounts2 = await web3.eth.getAccounts();
    console.log("hi");
    console.log(accounts2[0]);
    계정변경(accounts2[0]);
  }

  // if (data1.data && data2.data) {
  // }
  useEffect(() => {
    getGlobalAccounts();
  }, []);

  console.log(buyData);
  console.log(offerData);

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

    // 메이크 오퍼의 offers 배열이 내가 오퍼한 개수, 오퍼한 것 중 나의 작품의 전체 순번이니까
    // offerId : 전체 오퍼한 개수 중 내 작품의 순번
    // _id : 전체 상품들 나열 중 내 작품의 번호 가져옴

    console.log("일단");
    console.log(buyData[0].id);
    for (let i = 0; i < offerData.length; i++) {
      console.log("여기");
      if (offerData[i].id == buyData[0].id) {
        console.log("뜨나");
        console.log(offerData[i]);
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

  const claimFundsHandler = async () => {
    let pra2;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();

    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;
    praaccounts = accounts1;

    pra2.methods
      .claimFunds()
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해쉬해쉬", hash);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });
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

    // 바이

    // 캔슬
  };

  return (
    <div>
      1
      <button onClick={claimFundsHandler} className="btn btn-success">
        느그 돈 받아가랑
      </button>
      {a === 1 && 계정 === buyData[0].owner ? (
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
      ) : (
        <div className="row">
          <div className="d-grid gap-2 col-5 mx-auto">
            <button onClick={buyHandler} className="btn btn-success">
              BUY
            </button>
          </div>
          <div className="row">
            <div className="d-grid gap-2 col-5 mx-auto">
              <button onClick={cancelHandler} className="btn btn-danger">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        버튼버튼
      </Button>
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
                buyData.map((a) => (
                  <div>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box
                            bgcolor="info.main"
                            color="info.contrastText"
                            p={2}
                          >
                            제목{a.img}
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            bgcolor="info.main"
                            color="info.contrastText"
                            p={2}
                          >
                            판매자{a.img}
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            bgcolor="info.main"
                            color="info.contrastText"
                            p={2}
                          >
                            조회수{a.img}
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            bgcolor="info.main"
                            color="info.contrastText"
                            p={2}
                          >
                            좋아요{a.img}
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
                  </div>
                ))
              ) : (
                <div>
                  <h1>아님</h1>
                </div>
              )}

              <Grid item xs={6} sm={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  디테일 정보
                </Box>
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

              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이 날듯?
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SetBuy;
