import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { fetchBestCollections } from "../hooks";
import { fetchBuySell } from "../hooks";
import { fetchBuy } from "../hooks";
import { fetchWho } from "../hooks";
import { useState, useEffect } from "react";

import web3 from "./connection/web3";
// import ConstContract from "../../build/contracts/ConstContract.json";
import ConstContract from "../../build/contracts/ImageMarketplace.json";

const theme = createTheme();

// 컨트랙트 불러오기
const setupBlockchain = async () => {
  try {
    // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);

    // Get the contract instance.
    let balance =
      accounts.length > 0
        ? await web3.eth.getBalance(accounts[0])
        : await web3.utils.toWei("0");
    balance = await web3.utils.fromWei(balance, "ether");
    console.log("balance", balance);

    const networkId = await web3.eth.net.getId();
    console.log("networkId", networkId);

    const deployedAddress = ConstContract.networks[networkId].address;
    const NFTMarketplaceInstance = new web3.eth.Contract(
      ConstContract.abi,
      deployedAddress
    );
    console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);

    return NFTMarketplaceInstance;
  } catch (error) {
    // 위의 작업에 대한 오류를 포착합니다.
    alert(
      "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
    );
    console.error(error);
  }
};

const BuyDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(`https://const123.s3.ap-northeast-2.amazonaws.com/${id}`);
  }, [id]);

  const useUser1 = () => {
    const result = useQuery(["buyDetail"], () => fetchBuySell(id));
    return result;
  };
  const useUser2 = () => {
    const result = useQuery(["getWho"], () => fetchWho(id));
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

  console.log(data1);
  // const { data, isLoading, isFetching } = useQuery(["buyDetail"], () =>
  //   fetchBuySell(id)
  // );
  // const { data2, isLoading2, isFetching2 } = useQuery(["getBuy"], () =>
  //   fetchBuy()
  // );
  // const { data, isLoading, isFetching } = useQuery(["getWho"], () =>
  //   fetchWho(id)
  // );

  let abcd;
  let a;
  if (data1.data) {
    abcd = data1.data.data;
    a = 1;
  }

  let qwer;
  let b;
  if (data2.data) {
    qwer = data2.data.data;
    b = 1;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // 컨트랙트 처리부분
    // imageNFT로 변경 처리
    const Contract = await setupBlockchain();
    const accounts = await web3.eth.getAccounts();

    // 누구의 상품인지 불러오는 로직이 하나 들어가야함
    // public key로 할 거임 정했음
    let who = qwer.address;

    console.log(who);
    // 가격 임시 선언
    const price = parseInt(1000);
    console.log(price);

    // 시작전 승인 단계
    // await Contract.methods
    //   .approve(Contract.options.address, who)
    //   .send({ from: accounts[0] })
    //   .on("transactionHash", (hash) => {
    //     console.log("해시", hash);
    //   })
    //   .on("receipt", (receipt) => {
    //     Contract.methods
    //       .makeOffer(who, price)
    //       .send({ from: accounts[0] })
    //       .on("error", (error) => {
    //         window.alert("Something went wrong when pushing to the blockchain");
    //       });
    //   });

    // 사는 단계
    await Contract.methods
      // .fillOffer(who)
      .fillOffer("0xB252E5EA1dE3cA6f893fD157A06596026fB86488")
      .send({
        from: accounts[0],
        value: price,
      })
      .on("transactionHash", (hash) => {
        console.log("해시2", hash);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
      });

    // 취소 단계
    // await Contract.methods
    //   .cancelOffer(who)
    //   .send({ from: accounts[0] })
    //   .on("transactionHash", (hash) => {
    //     console.log("해시3", hash);
    //   })
    //   .on("error", (error) => {
    //     window.alert("Something went wrong when pushing to the blockchain");
    //   });

    // // 일단 cid 들어가는데 cid를 만드는 방법을 자세히 알고 쓰자 지금 업로드가 제대로 안되잖아
    // await Contract.methods
    //   .mintImageNFT(data.title, bu.path)
    //   .send({ from: accounts[0] });
    // console.log("=== Mint ===", data.title);
    // window.location.reload(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
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
                    여기에 연관 상품들 나열할 건데 이건 data fetch 하는 식이
                    날듯?
                  </Box>
                </Grid>
              </Grid>
            </main>
          </Container>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default BuyDetail;
