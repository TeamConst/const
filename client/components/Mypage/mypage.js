
import { useEffect, useState, useRef } from "react";

import { useForm } from "react-hook-form";

import { useQuery } from "react-query";
import { fetchUserSession, fetchMyNFTDB } from "../../hooks";
import Sidebar from "./Sidebar";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import styled from "styled-components";

import web3 from "../connection/web3";

import axios from "axios";

import Link from "next/link";

import GetMyBuy from "../GetContract/Mine/getMyBuy";
import GetMyNFT from "../GetContract/Mine/getMyBuy";
import GetMyAuction from "../GetContract/Mine/getMyAuction";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";


const Smallertext = styled.div`
  font-weight: normal;
  font-size: 0.7rem;
  color: hsl(0, 0%, 50%);
  text-align: center;
  letter-spacing: 1px;
  padding-bottom: 20px;
  line-height: 5px;
`;
const Cardcontainer = styled.div`
  background-color: white;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
  box-shadow: 0px 10px 20px hsl(185, 75%, 35%);
`;
const Cardcontainer2 = styled.div`
  background-color: white;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
`;
const Followers = styled.div`
  flex: 1;
`;
const Socialcontainer = styled.div`
  display: flex;
  border-top: solid rgb(206, 206, 206) 1px;
  text-align: center;
`;
const Normaltext = styled.div`
  font-weight: normal;
  font-size: 0.95rem;
  color: hsl(0, 0%, 50%);
  text-align: center;
  padding-bottom: 10px;
`;
const Boldtext = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const Header = styled.div`
  background-position: 0px 0px;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
`;
const Img = styled.img`
  margin: auto;
  width: 15%;
  border: solid white 4px;
  border-radius: 50%;
  margin-top: 75px;
`;

const theme = createTheme();

const Mypage1 = () => {
  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const useUser2 = () => {
    const result = useQuery(["getMyNFTDB"], () => fetchMyNFTDB());
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

  const [accountBalance, setAccountBalance] = useState("");

  useEffect(() => {
    async function loadBalance() {
      const accounts = await web3.eth.getAccounts();
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");
      setAccountBalance(balance);
    }
    loadBalance();
  }, []);

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }

  let c = 0;
  let myNFTData;
  let count = 0;
  if (data2.data) {
    c = 1;
    myNFTData = data2.data.data;
    count = data2.data.data.length;
  }

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

  let lastTime;
  if (userSession && userSession.ticket !=="이용권 없음") {
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime();
    lastTime = Math.ceil((dday - today) / (1000 * 60 * 60 * 24));
  } else if(userSession && userSession.ticket ==="이용권 없음"){
    lastTime=0;
  }

  console.log(lastTime);
  if (userSession) {
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime();

    if (dday - today <= 0 && userSession.ticket !== "이용권 없음") {
      console.log(dday - today);
      const rere = axios.post("http://localhost:8080/api/updateuser", {
        ticket: `이용권 없음`,
        ticketTime: "0",
        id: userSession.id,
      });
    }
  }

  const fileInput = useRef(null);

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append("image", image);
      imageFormData.append("id2", userSession.id2);

      const resultImage = await axios.post(
        "http://localhost:8080/api/signup/updateImage",
        imageFormData
      );
      const rere = axios.post("http://localhost:8080/api/updateUser2", {
        profileImg: `https://const123.s3.ap-northeast-2.amazonaws.com/profile/${userSession.id2}.jpg`,
        id2: userSession.id2,
      });
    }

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setImage(reader.result)
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg" sx={{ py: 24 }}>
          {a === 1 && c === 1 ? (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Cardcontainer>
                  <Header>
                    <Img
                      src={`${userSession.profileImg}`}
                      style={{ margin: "20px" }}
                      size={200}
                      onClick={() => {
                        fileInput.current.click();
                      }}
                    />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/jpg,impge/png,image/jpeg"
                      name="profile_img"
                      onChange={onChange}
                      ref={fileInput}
                    />
                  </Header>

                  <Link href={`/userUpdate2`}>
                    <Followers>
                      <Smallertext>수정하기</Smallertext>
                    </Followers>
                  </Link>
                  <Boldtext>
                    {userSession.name}
                    <span className="normal-text">나이/랭크</span>
                  </Boldtext>
                  <Normaltext>{userSession.artist}</Normaltext>
                  <Socialcontainer>
                    <Followers>
                      <Boldtext>{count}</Boldtext>
                      <Smallertext> 소유한 NFTS의 총 수</Smallertext>
                    </Followers>
                    <Followers className="likes">
                      <Boldtext>{accountBalance}/eth</Boldtext>
                      <Smallertext>잔액</Smallertext>
                    </Followers>
                    <Followers className="photos">
                      <Boldtext>
                        {`${userSession.ticket}${lastTime}일남음`}
                      </Boldtext>
                      <Smallertext>이용권 정보</Smallertext>
                    </Followers>
                  </Socialcontainer>
                </Cardcontainer>
              </Grid>
              {/* <Grid item xs={9}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext> 내 수익 현황</Boldtext>
                  </Followers>
                </Cardcontainer2>
              </Grid>
              <Grid item xs={3}>
                <Link href={`/mypage/myNFT/${userSession.address}`}>
                  <Cardcontainer2
                    bgcolor="info.main"
                    color="info.contrastText"
                    p={2}
                  >
                    <Followers>
                      <Boldtext>
                        <Button
                          onClick={claimFundsHandler}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          구매 완료 된 이더 받기
                        </Button>
                      </Boldtext>
                    </Followers>
                  </Cardcontainer2>
                </Link>
              </Grid> */}
              {/* <Grid item xs={9}>
                <Link href={`/mypage/myNFT/${userSession.address}`}>
                  <Cardcontainer2
                    bgcolor="info.main"
                    color="info.contrastText"
                    p={2}
                  >
                    <Followers>
                      <Boldtext>나의 전체 NFT </Boldtext>
                    </Followers>
                  </Cardcontainer2>
                </Link>
              </Grid> */}
              {/* <Grid item xs={3}>
                <Link href={`/mypage/myNFT/${userSession.address}`}>
                  <Cardcontainer2
                    bgcolor="info.main"
                    color="info.contrastText"
                    p={2}
                  >
                    <Followers>
                      <Boldtext> 자세히보기 </Boldtext>
                    </Followers>
                  </Cardcontainer2>
                </Link>
              </Grid> */}
              {/* <Grid item xs={12}> */}
                {/* <GetMyNFTDB></GetMyNFTDB> */}
                {/* <GetMyNFT></GetMyNFT> */}
              {/* </Grid> */}
              {/* <Grid item xs={9}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext> 판매중인 나의 NFT </Boldtext>
                  </Followers>
                </Cardcontainer2>
              </Grid> */}
              {/* <Grid item xs={3}>
                <Link href={`/mypage/myBuy/${userSession.address}`}>
                  <Cardcontainer2
                    bgcolor="info.main"
                    color="info.contrastText"
                    p={2}
                  >
                    <Followers>
                      <Boldtext> 자세히보기 </Boldtext>
                    </Followers>
                  </Cardcontainer2>
                </Link>
              </Grid> */}
              {/* <Grid item xs={12}>
                <GetMyBuyDB></GetMyBuyDB> */}
                {/* <GetMyBuy></GetMyBuy> */}
              {/* </Grid> */}

              {/* <Grid item xs={9}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext> 경매중인 나의 NFT </Boldtext>
                  </Followers>
                </Cardcontainer2>
              </Grid> */}
              {/* <Grid item xs={3}>
                <Link href={`/mypage/myAuction/${userSession.address}`}>
                  <Cardcontainer2
                    bgcolor="info.main"
                    color="info.contrastText"
                    p={2}
                  >
                    <Followers>
                      <Boldtext> 자세히 보기 </Boldtext>
                    </Followers>
                  </Cardcontainer2>
                </Link>
              </Grid> */}
              {/* <Grid item xs={12}>
                <GetMyAuctionDB></GetMyAuctionDB> */}
                {/* <GetMyAuction></GetMyAuction> */}
              {/* </Grid> */}

           
              {/* <Grid item xs={4}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext> 내 음원의 총 재생시간 </Boldtext>
                  </Followers>
                </Cardcontainer2>
              </Grid> */}
              {/* <Grid item xs={4}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext> 내음원을 들은 총 재생 횟수 </Boldtext>
                  </Followers>
                </Cardcontainer2>
              </Grid> */}
              {/* <Grid item xs={4}>
                <Cardcontainer2
                  bgcolor="info.main"
                  color="info.contrastText"
                  p={2}
                >
                  <Followers>
                    <Boldtext>내가 최근 들은 곡 Recently Played 등등</Boldtext>
                  </Followers>
                </Cardcontainer2>
              
            </Grid> */}
            <Grid item xs={12}>  <Cardcontainer>
            <Sidebar/>
                </Cardcontainer></Grid>
              
              </Grid>
          ) : (
            <div>오류임</div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Mypage1;

