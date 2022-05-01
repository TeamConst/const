import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import MusicPlayer from "../Musicplay/MusicPlayer";
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
  fetchTransactionDetailDB,
  fetchUserSessionAll,
} from "../../hooks";

import { useState, useEffect } from "react";

import web3 from "../connection/web3";
import collectionContractJSON from "../../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../../build/contracts/NFTMarketplace.json";

import axios from "axios";
import styled from "styled-components";
// nivo
import { ResponsiveLine } from "@nivo/line";
//css
const Wrap = styled.div`
  width: 960px;
  max-width: 100%;
  margin: 0 auto;
`;
const Header = styled.div`
  background: #555;
  box-shadow: 1px 2px 7px #333;
`;
const FramePosizione = styled.div`
  margin-left: 0px;
  margin-right: -1px;
  display: block;
`;
const Bottone = styled.div`
  height: 70px;
  width: 70px;
  background: #111;
  margin: 20px auto;
  border-radius: 100px;
`;
const Schermo = styled.div`
  height: 100%;
  width: 100%;
  background-color: #6666;
  opacity: 1;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
`;
const Microfono = styled.div`
  background: #111;
  height: 7px;
  width: 90px;
  margin: -19px auto 0;
  border-radius: 100px;
`;
const Sensore = styled.div`
  background: #111;
  height: 7px;
  width: 7px;
  margin: 12px 100px;

  border-radius: 100px;
  display: block;
`;
const Fotocamera = styled.div`
background: #111;
height: 7px;
width: 7px;
margin: auto;

border-radius: 100px;
display: block;
}
`;
const Dettaglio = styled.div`
  position: absolute;
  left: 0;
  top: 17px;
  width: 100%;
`;
const VolumeGiu = styled.div`
  height: 40px;
  width: 3px;
  left: -7px;
  top: 155px;
  border-radius: 4px 0 0 4px;

  width: 5px;
  background: #333;
  position: absolute;
`;
const VolumeSu = styled.div`
  height: 40px;
  width: 3px;
  left: -7px;
  top: 110px;
  border-radius: 4px 0 0 4px;

  width: 5px;
  background: #333;
  position: absolute;
`;
const AcenzioneButton = styled.div`
  background-color: #333;

  height: 15px;
  left: -5px;
  top: 59px;
  border-radius: 4px 0 0 4px;

  width: 3px;
  background: #333;
  position: absolute;
`;

const Smart = styled.div`
margin-left:auto;
  margin-right:auto;
  margin-top: 100px;;
	background-color: #333;

  border-radius:30px;

	width: 90%;
	height: 40%
	border-radius: 40px;
	border: 2px solid #ddd;
	margin: 0 auto;
	padding: 60px 10px;
	position: relative;


`;

const Boldtext = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const Smalltext = styled.div`
  text-align: center;
  padding: 10px 20px 0px 20px;
`;
const ProfileImg = styled.img`
  width: 10%;
  border-radius: 50%;
`;
//
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

  // 가격 변동 그래프 만드려고
  const useUser6 = () => {
    const result = useQuery(["getTransactionDetailDB"], () =>
      fetchTransactionDetailDB(id)
    );
    return result;
  };

  const useUser7 = () => {
    const result = useQuery(["getUserSessionAll"], () => fetchUserSessionAll());
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();
  const data3 = useUser3();
  const data4 = useUser4();
  const data5 = useUser5();
  const data6 = useUser6();
  const data7 = useUser7();

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

  let f = 0;
  let transactionDetailDB;
  if (data6.data) {
    transactionDetailDB = data6.data.data;
  }

  let z = 0;
  let userSessionAll;
  if (data7.data) {
    z = 1;
    userSessionAll = data7.data.data;
  }

  let g = 0;
  if (userSessionAll) {
    // 음원좋아요변경(false);
    // 가수좋아요변경(false);
    // 음원즐겨찾기변경(false);

    userSessionAll[0].likeMusic = false;
    userSessionAll[0].bookmarkMusic = false;
    userSessionAll[0].likeArtist = false;

    if (!userSessionAll[0].LikeMusic_address[0]) {
      userSessionAll[0].likeMusic = true;
      // 음원좋아요변경(true);
    } else if (userSessionAll[0].LikeMusic_address[0].like === false) {
      userSessionAll[0].likeMusic = true;
      // 음원좋아요변경(true);
    }
    if (!userSessionAll[0].LikeArtist_address[0]) {
      userSessionAll[0].likeArtist = true;
      // 가수좋아요변경(true);
    } else if (userSessionAll[0].LikeArtist_address[0].like === false) {
      userSessionAll[0].likeArtist = true;
      // 가수좋아요변경(true);
    }
    if (!userSessionAll[0].BookmarkMusic_address[0]) {
      userSessionAll[0].bookmarkMusic = true;
      // 음원즐겨찾기변경(true);
    } else if (userSessionAll[0].BookmarkMusic_address[0].like === false) {
      userSessionAll[0].bookmarkMusic = true;
      // 음원즐겨찾기변경(true);
    }

    g = 1;
    // console.log(userSessionAll.BookmarkMusic_address);
  }

  const upLikeMusic = async () => {
    await axios.post("http://localhost:8080/api/upLikeMusic", { CID: id });
  };
  const cancelLikeMusic = async () => {
    await axios.post("http://localhost:8080/api/cancelLikeMusic", {
      CID: id,
    });
  };
  const upLikeArtist = async () => {
    await axios.post("http://localhost:8080/api/upLikeArtist", { CID: id });
  };
  const cancelLikeArtist = async () => {
    await axios.post("http://localhost:8080/api/cancelLikeArtist", {
      CID: id,
    });
  };
  const upBookmarkMusic = async () => {
    await axios.post("http://localhost:8080/api/upBookmarkMusic", {
      CID: id,
    });
  };
  const cancelBookmarkMusic = async () => {
    await axios.post("http://localhost:8080/api/cancelBookmarkMusic", {
      CID: id,
    });
  };

  console.log("a", a);
  console.log("b", b);
  console.log("c", c);
  console.log("d", d);
  console.log("e", e);
  console.log("f", f);
  console.log("g", g);
  console.log("z", z);

  // 그래프 그리기

  let aaaa = [];
  if (transactionDetailDB) {
    let bbbb = [];
    for (let i = 0; i < transactionDetailDB.length; i++) {
      bbbb[i] = {
        x: `${transactionDetailDB[i].id}1`,

        y: transactionDetailDB[i].price,
      };
    }

    let c = [...bbbb];
    // for (let i = 0; i < transactionDetailDB.length; i++) {
    //   bbbb = {
    //     x: transactionDetailDB[i].id,
    //     y: transactionDetailDB[i].price,
    //   };
    // }

    f = 1;

    aaaa[0] = { id: "kyle", color: "hsl(114, 70%, 50%)", data: c };
  }

  console.log("f", f);

  console.log(transactionDetailDB);
  console.log(aaaa);
  // const MyResponsiveLine = ({ data /* see data tab */ }) => (
  //   <ResponsiveLine
  //     data={data}
  //     margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
  //     xScale={{ type: "linear" }}
  //     yScale={{ type: "linear", stacked: true, min: 0, max: 2500 }}
  //     yFormat=" >-.2f"
  //     curve="monotoneX"
  //     axisTop={null}
  //     axisRight={{
  //       tickValues: [0, 500, 1000, 1500, 2000, 2500],
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       format: ".2s",
  //       legend: "",
  //       legendOffset: 0,
  //     }}
  //     axisBottom={{
  //       tickValues: [0, 20, 40, 60, 80, 100, 120],
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       format: ".2f",
  //       legend: "price",
  //       legendOffset: 36,
  //       legendPosition: "middle",
  //     }}
  //     axisLeft={{
  //       tickValues: [0, 500, 1000, 1500, 2000, 2500],
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       format: ".2s",
  //       legend: "volume",
  //       legendOffset: -40,
  //       legendPosition: "middle",
  //     }}
  //     enableGridX={false}
  //     colors={{ scheme: "spectral" }}
  //     lineWidth={1}
  //     pointSize={4}
  //     pointColor={{ theme: "background" }}
  //     pointBorderWidth={1}
  //     pointBorderColor={{ from: "serieColor" }}
  //     pointLabelYOffset={-12}
  //     useMesh={true}
  //     gridXValues={[0, 20, 40, 60, 80, 100, 120]}
  //     gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
  //     legends={[
  //       {
  //         anchor: "bottom-right",
  //         direction: "column",
  //         justify: false,
  //         translateX: 140,
  //         translateY: 0,
  //         itemsSpacing: 2,
  //         itemDirection: "left-to-right",
  //         itemWidth: 80,
  //         itemHeight: 12,
  //         itemOpacity: 0.75,
  //         symbolSize: 12,
  //         symbolShape: "circle",
  //         symbolBorderColor: "rgba(0, 0, 0, .5)",
  //         effects: [
  //           {
  //             on: "hover",
  //             style: {
  //               itemBackground: "rgba(0, 0, 0, .03)",
  //               itemOpacity: 1,
  //             },
  //           },
  //         ],
  //       },
  //     ]}
  //   />
  // );

  // ResponsiveLine(aaaa);

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

    // 메이크 오퍼의 offers 배열이 내가 오퍼한 개수, 오퍼한 것 중 나의 작품의 전체 순번이니까
    // offerId : 전체 오퍼한 개수 중 내 작품의 순번
    // _id : 전체 상품들 나열 중 내 작품의 번호 가져옴

    const etherPrice = web3.utils.toWei(String(buyMusicDB.price), "ether");

    for (let i = 0; i < offerData.length; i++) {
      if (
        offerData[i].id == buyData[0].id &&
        offerData[i].price == etherPrice
      ) {
        pra2.methods
          .fillOffer(offerData[i].offerId)
          .send({
            from: praaccounts[0],
            value: offerData[i].price,
          })
          .on("transactionHash", (hash) => {
            console.log("해시해시", hash);
            alert("구매를 성공하셨습니다! 마이페이지에서 확인해주세요");
            window.location.href = "http://localhost:8080/mypage";
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

  const aq = [
    {
      id: "Class Average",
      data: [
        {
          x: "1.1",
          y: 0,
        },
        {
          x: "1.2",
          y: 0,
        },
        {
          x: "1.3",
          y: 0,
        },
        {
          x: "1.4",
          y: 0,
        },
        {
          x: "1.5",
          y: 0,
        },
        {
          x: "1.6",
          y: 0,
        },
        {
          x: "1.7",
          y: 0,
        },
        {
          x: "2.1",
          y: 0,
        },
        {
          x: "2.2",
          y: 0,
        },
        {
          x: "2.3",
          y: 0,
        },
        {
          x: "2.4",
          y: 0,
        },
        {
          x: "2.5",
          y: 0,
        },
        {
          x: "2.6",
          y: 0,
        },
        {
          x: "2.7",
          y: 0,
        },
        {
          x: "2.8",
          y: 0,
        },
        {
          x: "3.1",
          y: 0,
        },
        {
          x: "3.2",
          y: 0,
        },
        {
          x: "3.3",
          y: 0,
        },
        {
          x: "3.4",
          y: 0,
        },
        {
          x: "3.5",
          y: 0,
        },
        {
          x: "3.6",
          y: 0,
        },
        {
          x: "3.7",
          y: 0,
        },
        {
          x: "4.1",
          y: 0,
        },
        {
          x: "4.2",
          y: 0,
        },
        {
          x: "4.3",
          y: 0,
        },
        {
          x: "4.4",
          y: 69,
        },
        {
          x: "4.5",
          y: 45,
        },
        {
          x: "4.6",
          y: 81,
        },
        {
          x: "4.7",
          y: 0,
        },
        {
          x: "4.8",
          y: 0,
        },
        {
          x: "5.1",
          y: 0,
        },
        {
          x: "5.2",
          y: 84,
        },
        {
          x: "5.3",
          y: 0,
        },
        {
          x: "5.4",
          y: 88,
        },
        {
          x: "5.5",
          y: 89,
        },
        {
          x: "5.6",
          y: 73,
        },
        {
          x: "5.7",
          y: 40,
        },
        {
          x: "5.8",
          y: 86,
        },
        {
          x: "5.9",
          y: 84,
        },
        {
          x: "6.1",
          y: 0,
        },
        {
          x: "6.2",
          y: 0,
        },
        {
          x: "6.3",
          y: 0,
        },
        {
          x: "6.4",
          y: 0,
        },
        {
          x: "6.5",
          y: 0,
        },
        {
          x: "6.6",
          y: 0,
        },
        {
          x: "6.7",
          y: 0,
        },
        {
          x: "6.8",
          y: 0,
        },
        {
          x: "6.9",
          y: 0,
        },
        {
          x: "6.10",
          y: 0,
        },
        {
          x: "7.1",
          y: 0,
        },
        {
          x: "7.2",
          y: 0,
        },
        {
          x: "7.3",
          y: 0,
        },
        {
          x: "7.4",
          y: 0,
        },
        {
          x: "7.5",
          y: 0,
        },
        {
          x: "7.6",
          y: 0,
        },
        {
          x: "7.7",
          y: 0,
        },
        {
          x: "7.8",
          y: 0,
        },
        {
          x: "7.9",
          y: 0,
        },
        {
          x: "8.1",
          y: 0,
        },
        {
          x: "8.2",
          y: 0,
        },
        {
          x: "8.3",
          y: 0,
        },
        {
          x: "8.4",
          y: 0,
        },
        {
          x: "8.5",
          y: 0,
        },
        {
          x: "8.6",
          y: 0,
        },
        {
          x: "8.7",
          y: 0,
        },
        {
          x: "8.8",
          y: 0,
        },
        {
          x: "8.9",
          y: 0,
        },
        {
          x: "8.10",
          y: 0,
        },
        {
          x: "9.1",
          y: 0,
        },
        {
          x: "9.2",
          y: 0,
        },
      ],
    },
    {
      id: "Avg: smuTest",
      data: [
        {
          x: "1.1",
          y: 0,
        },
        {
          x: "1.2",
          y: 0,
        },
        {
          x: "1.3",
          y: 0,
        },
        {
          x: "1.4",
          y: 0,
        },
        {
          x: "1.5",
          y: 0,
        },
        {
          x: "1.6",
          y: 0,
        },
        {
          x: "1.7",
          y: 0,
        },
        {
          x: "2.1",
          y: 0,
        },
        {
          x: "2.2",
          y: 0,
        },
        {
          x: "2.3",
          y: 0,
        },
        {
          x: "2.4",
          y: 0,
        },
        {
          x: "2.5",
          y: 0,
        },
        {
          x: "2.6",
          y: 0,
        },
        {
          x: "2.7",
          y: 0,
        },
        {
          x: "2.8",
          y: 0,
        },
        {
          x: "3.1",
          y: 0,
        },
        {
          x: "3.2",
          y: 0,
        },
        {
          x: "3.3",
          y: 0,
        },
        {
          x: "3.4",
          y: 0,
        },
        {
          x: "3.5",
          y: 0,
        },
        {
          x: "3.6",
          y: 0,
        },
        {
          x: "3.7",
          y: 0,
        },
        {
          x: "4.1",
          y: 0,
        },
        {
          x: "4.2",
          y: 0,
        },
        {
          x: "4.3",
          y: 0,
        },
        {
          x: "4.4",
          y: 100,
        },
        {
          x: "4.5",
          y: 67,
        },
        {
          x: "4.6",
          y: 83,
        },
        {
          x: "4.7",
          y: 0,
        },
        {
          x: "4.8",
          y: 0,
        },
        {
          x: "5.1",
          y: 0,
        },
        {
          x: "5.2",
          y: 100,
        },
        {
          x: "5.3",
          y: 0,
        },
        {
          x: "5.4",
          y: 100,
        },
        {
          x: "5.5",
          y: 100,
        },
        {
          x: "5.6",
          y: 51,
        },
        {
          x: "5.7",
          y: 51,
        },
        {
          x: "5.8",
          y: 51,
        },
        {
          x: "5.9",
          y: 100,
        },
        {
          x: "6.1",
          y: 0,
        },
        {
          x: "6.2",
          y: 0,
        },
        {
          x: "6.3",
          y: 0,
        },
        {
          x: "6.4",
          y: 0,
        },
        {
          x: "6.5",
          y: 0,
        },
        {
          x: "6.6",
          y: 0,
        },
        {
          x: "6.7",
          y: 0,
        },
        {
          x: "6.8",
          y: 0,
        },
        {
          x: "6.9",
          y: 0,
        },
        {
          x: "6.10",
          y: 0,
        },
        {
          x: "7.1",
          y: 0,
        },
        {
          x: "7.2",
          y: 0,
        },
        {
          x: "7.3",
          y: 0,
        },
        {
          x: "7.4",
          y: 0,
        },
        {
          x: "7.5",
          y: 0,
        },
        {
          x: "7.6",
          y: 0,
        },
        {
          x: "7.7",
          y: 0,
        },
        {
          x: "7.8",
          y: 0,
        },
        {
          x: "7.9",
          y: 0,
        },
        {
          x: "8.1",
          y: 0,
        },
        {
          x: "8.2",
          y: 0,
        },
        {
          x: "8.3",
          y: 0,
        },
        {
          x: "8.4",
          y: 0,
        },
        {
          x: "8.5",
          y: 0,
        },
        {
          x: "8.6",
          y: 0,
        },
        {
          x: "8.7",
          y: 0,
        },
        {
          x: "8.8",
          y: 0,
        },
        {
          x: "8.9",
          y: 0,
        },
        {
          x: "8.10",
          y: 0,
        },
        {
          x: "9.1",
          y: 0,
        },
        {
          x: "9.2",
          y: 0,
        },
      ],
    },
  ];
  const id2 = id;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 15 }}>
          {a === 1 && c === 1 && d === 1 && e === 1 ? (
            buyData.map((a) => (
              <Grid container spacing={5} textAlign="center">
                <Grid item xs={6}>
                  <div>
                    <Smart>
                      <Dettaglio>
                        <Sensore></Sensore>
                        <Microfono></Microfono>
                      </Dettaglio>
                      <AcenzioneButton></AcenzioneButton>
                      <VolumeSu></VolumeSu>
                      <VolumeGiu></VolumeGiu>
                      <Schermo>
                        <MusicPlayer
                          str={id2}
                          title={buyDB.title}
                          artist={buyDB.artist}
                        />
                        <FramePosizione>
                          <Header>
                            <Wrap></Wrap>
                          </Header>
                        </FramePosizione>
                      </Schermo>
                      <Bottone></Bottone>
                    </Smart>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Boldtext>
                        {" "}
                        {`${buyDB.artist}  -  ${buyDB.title}`}
                      </Boldtext>
                    </Grid>
                    <Grid item xs={12}>
                      <hr />
                      <Smalltext>
                        <ProfileImg src={userDB.profileImg} />
                        {userDB.id2}
                      </Smalltext>
                    </Grid>
                    <Grid item xs={6}>
                      <hr />
                      👁 {buyDB.view}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <hr />
                      좋아요 {buyDB.LikeMusic}
                    </Grid>

                    <Grid item xs={12}>
                      <hr />
                      <Smalltext>Direct purchase price</Smalltext>
                      <Boldtext>{`Price:${buyMusicDB.price}eth`} </Boldtext>
                      <hr />
                    </Grid>

                    <Grid item xs={12}>
                      {g === 1 ? (
                        <Box>
                          {userSessionAll[0].likeMusic === true ? (
                            <button onClick={() => upLikeMusic()}>
                              <img src={"/img/heart.png"} width={"30px"}></img>
                            </button>
                          ) : (
                            <button onClick={() => cancelLikeMusic()}>
                              <img
                                src={"/img/fullheart.png"}
                                width={"30px"}
                              ></img>
                            </button>
                          )}

                          {userSessionAll[0].likeArtist === true ? (
                            <button onClick={() => upLikeArtist()}>
                              <img src={"/img/artist.png"} width={"30px"}></img>
                            </button>
                          ) : (
                            <button onClick={() => cancelLikeArtist()}>
                              <img
                                src={"/img/fullartist.png"}
                                width={"30px"}
                              ></img>
                            </button>
                          )}

                          {userSessionAll[0].bookmarkMusic === true ? (
                            <button onClick={() => upBookmarkMusic()}>
                              <img
                                src={"/img/bookmark.png"}
                                width={"30px"}
                              ></img>
                            </button>
                          ) : (
                            <button onClick={() => cancelBookmarkMusic()}>
                              <img
                                src={"/img/fullbookmark.png"}
                                width={"30px"}
                              ></img>
                            </button>
                          )}
                        </Box>
                      ) : (
                        <Box>로그인을 하시면 모든 정보 열람이 가능합니다.</Box>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {g === 1 ? (
                        <Box>
                          {계정 === userDB.address ? (
                            <Box>
                              <hr></hr>
                              <Box p={2}>
                                <Typography>본인의 상품입니다</Typography>
                                {/* <Button
                                    type="sumit"
                                    fullWidth
                                    onClick={cancelHandler}
                                    variant="contained"
                                >
                                    오퍼 취소하기
                                </Button> */}
                              </Box>
                              <hr></hr>
                            </Box>
                          ) : (
                            <Box>
                              <hr></hr>
                              <Box p={2}>
                                <Button
                                  onClick={buyHandler}
                                  fullWidth
                                  variant="contained"
                                >
                                  구매하기
                                </Button>
                              </Box>
                              <hr></hr>
                            </Box>
                          )}
                        </Box>
                      ) : (
                        <Box>
                          <hr></hr>
                          로그인을 하시면 구매 탭이 활성화 됩니다.
                        </Box>
                      )}
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
                  <Box p={2}>
                    <Typography>가격 그래프</Typography>

                    {/* <div>
                      {f === 1 ? (
                        <div>
                          <Box sx={{ m: 2 }}>
                            나와바
                            <ResponsiveLine
                              data={aq}
                              margin={{
                                top: 50,
                                right: 160,
                                bottom: 50,
                                left: 60,
                              }}
                              xScale={{ type: "linear" }}
                              yScale={{
                                type: "linear",
                                stacked: true,
                                min: 0,
                                max: 2500,
                              }}
                              yFormat=" >-.2f"
                              curve="monotoneX"
                              axisTop={null}
                              axisRight={{
                                tickValues: [0, 500, 1000, 1500, 2000, 2500],
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: ".2s",
                                legend: "",
                                legendOffset: 0,
                              }}
                              axisBottom={{
                                tickValues: [0, 20, 40, 60, 80, 100, 120],
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: ".2f",
                                legend: "price",
                                legendOffset: 36,
                                legendPosition: "middle",
                              }}
                              axisLeft={{
                                tickValues: [0, 500, 1000, 1500, 2000, 2500],
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                format: ".2s",
                                legend: "volume",
                                legendOffset: -40,
                                legendPosition: "middle",
                              }}
                              enableGridX={false}
                              colors={{ scheme: "category10" }}
                              lineWidth={1}
                              pointSize={4}
                              // pointColor={{ theme: "background" }}
                              pointBorderWidth={1}
                              // pointBorderColor={{ from: "serieColor" }}
                              pointLabelYOffset={-12}
                              useMesh={true}
                              gridXValues={[0, 20, 40, 60, 80, 100, 120]}
                              gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
                              legends={[
                                {
                                  anchor: "bottom-right",
                                  direction: "column",
                                  justify: false,
                                  translateX: 140,
                                  translateY: 0,
                                  itemsSpacing: 2,
                                  itemDirection: "left-to-right",
                                  itemWidth: 80,
                                  itemHeight: 12,
                                  itemOpacity: 0.75,
                                  symbolSize: 12,
                                  symbolShape: "circle",
                                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                                  effects: [
                                    {
                                      on: "hover",
                                      style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                      },
                                    },
                                  ],
                                },
                              ]}
                            ></ResponsiveLine>
                            다나옴?
                          </Box>
                        </div>
                      ) : (
                        <div>그래프 안대연</div>
                      )}
                    </div> */}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box p={2}>연관상품</Box>
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
