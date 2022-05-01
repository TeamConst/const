import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

import { Typography, Stack, Paper } from "@mui/material";
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
import styled from "styled-components";
import axios from "axios";
import {
  fetchUserSessionAll,
  fetchUserDB,
  fetchAuctionDB,
  fetchAuctionMusicDB,
} from "../hooks";

import web3 from "./connection/web3";
import MusicPlayer from "../components/Musicplay/MusicPlayer";

const theme = createTheme();

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

const Market2 = (props) => {
  // DB 가져다 쓰고 하려고
  const useUser3 = () => {
    const result = useQuery(["getAuctionDB"], () => fetchAuctionDB(id));
    return result;
  };

  // 유저 DB 가져다 쓰고 하려고
  const useUser4 = () => {
    const result = useQuery(["getUserDB"], () => fetchUserDB(id));
    return result;
  };

  // AuctionMusic DB 가져다 쓰고 하려고
  const useUser5 = () => {
    const result = useQuery(["getAuctionMusicDB"], () =>
      fetchAuctionMusicDB(id)
    );
    return result;
  };

  const useUser6 = () => {
    const result = useQuery(["getUserSessionAll"], () => fetchUserSessionAll());
    return result;
  };

  const data3 = useUser3();
  const data4 = useUser4();
  const data5 = useUser5();
  const data6 = useUser6();

  let c = 0;
  let auctionDB;
  if (data3.data) {
    c = 1;
    auctionDB = data3.data.data;
  }

  let d = 0;
  let userDB;
  if (data4.data) {
    d = 1;
    userDB = data4.data.data;
  }

  let e = 0;
  let auctionMusicDB;
  if (data5.data) {
    e = 1;
    auctionMusicDB = data5.data.data;
  }

  let f = 0;
  let userSessionAll;
  if (data6.data) {
    f = 1;
    userSessionAll = data6.data.data;
  }

  const [음원좋아요, 음원좋아요변경] = useState(false);
  const [가수좋아요, 가수좋아요변경] = useState(false);
  const [음원즐겨찾기, 음원즐겨찾기변경] = useState(false);

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
      console.log("이거뜨나요?");
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

  // 클라이언트 처리
  const [계정, 계정변경] = useState();

  async function getGlobalAccounts() {
    const accounts2 = await web3.eth.getAccounts();
    계정변경(accounts2[0]);
  }

  useEffect(() => {
    getGlobalAccounts();
  }, []);

  // let accountAddress = props.accountAddress
  let Contract = props.Contract;
  //
  const router = useRouter();
  const { id } = router.query;

  const [이미지, 이미지변경] = useState();

  useEffect(() => {
    이미지변경(
      `https://const123.s3.ap-northeast-2.amazonaws.com/image/${id}.jpg`
    );
  }, [id]);

  const fromDb = id;
  let str = fromDb || `${id}`;

  console.log(str.slice(6, 52));
  str = str.slice(0, 52);
  console.log(str);

  const [음악, 음악변경] = useState();
  const changeMusic = async (str) => {
    console.log(str);
    음악변경(`https://ipfs.infura.io/ipfs/${str}`);
    console.log(`https://ipfs.infura.io/ipfs/${str}`);
  };

  let a = 1;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //
  const [ownerShipTrans, setOwnerShipTrans] = useState([]);
  const [currenciesIU, setCurrenciesIU] = useState(1);
  const [timesIU, setTimesIU] = useState(1);
  const [minBid, setMinBid] = useState(0);
  const [duration, setDuration] = useState(0);
  const [newBid, setNewBid] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const image = props.image;
    let ownerShipTrans = [];
    for (let i = 0; i < image.transferTime; i++) {
      let address = props.Contract.methods
        .ownerShipTrans(image.tokenID, i)
        .call();
      ownerShipTrans.push(address);
    }
    setOwnerShipTrans(ownerShipTrans);
    setReady(true);
  }, []);

  let image = props.image;
  let auction2 = props.Auction;

  console.log("props", props);
  console.log("endTime", auction2.endTime);
  let isOwner = props.image.currentOwner === props.accountAddress;

  let currentTime = Date.parse(new Date()) / 1000;

  let timeaa = new Date();
  console.log(timeaa);
  console.log("현재", currentTime);
  console.log("옥션", auction2.endTime);

  let leftTime = auction2.endTime - currentTime;

  let restHour;
  let restMin;
  let restSec;

  function calcDateDiff(data) {
    restHour = parseInt(data / 3600);
    restMin = parseInt((data - restHour * 3600) / 60);
    restSec = data % 60;
  }

  calcDateDiff(leftTime);

  let status =
    image.status == 0
      ? "경매종료"
      : image.status == 1
      ? "경매중"
      : "청구 대기 중";

  let newBid2 = newBid * currenciesIU;

  const endOnBid = async () => {
    let tokenID = props.tokenID;
    console.log("=== tokenID ===", tokenID);

    const abcd = await axios.post("http://localhost:8080/api/endAuction", {
      CID: auctionMusicDB.CID,
      lastWinner: props.accountAddress,
    });

    await props.Contract.methods
      .endAuction(tokenID)
      .send({ from: props.accountAddress });
    // window.location.reload(true);
  };

  // let tokenID = props.tokenID;
  let auction = props.Auction;
  //   let newBid = newBid * currenciesIU;

  console.log(image);
  console.log(auction);
  console.log(auction2);
  console.log(props.accountAddress);
  const bid = async () => {
    let tokenID = props.tokenID;
    // let auction = props.Auction;
    // let newBid = newBid * currenciesIU;

    if (newBid <= auction.highestBid) {
      window.alert("낮은 입찰가? 농담!");
      return;
    }

    const abcd = await axios.post("http://localhost:8080/api/updateAuction", {
      CID: auctionMusicDB.CID,
      currentPrice: newBid2,
      currentWinner: props.accountAddress,
    });

    await props.Contract.methods
      .bid(tokenID, newBid2)
      .send({ from: props.accountAddress });
    // window.location.reload(true);
  };

  const claim = async () => {
    let tokenID = props.tokenID;
    let auction = props.Auction;

    if (props.accountAddress != auction.winner) {
      window.alert("당신은 승자가 아닙니다!");
      return;
    }
    console.log(auction.highestBid);
    await props.Contract.methods
      .claim(tokenID)
      .send({ from: props.accountAddress, value: auction.highestBid });
    // window.location.reload(true);
  };
  console.log(image.status);
  //   let onBid = (image.status == 1);
  //   let toBeClaim = (image.status == 2);
  console.log(currenciesIU);
  console.log(ownerShipTrans);

  console.log(str);
  const ondada = () => {
    console.log("dada");
  };

  const onSubmit = async () => {
    const mintby = image.currentOwner;
    console.log(str);
    const str2 = str;
    const rere = await axios.post("http://localhost:8080/api/updateauction", {
      mintby: mintby,
      CID: str2,
    });
    console.log(rere);
    // window.location.reload(true);
  };

  console.log(props);
  console.log(auctionMusicDB);
  console.log(a);
  console.log(c);
  console.log(d);
  console.log(e);
  console.log(g, "gggggggggg");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg" sx={{ py: 15 }}>
          {a === 1 && c === 1 && d === 1 && e === 1 && g === 1 ? (
            <Grid container spacing={5}>
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
                        str={str}
                        title={auctionDB.title}
                        artist={auctionDB.artist}
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Boldtext>
                      {" "}
                      {`${auctionDB.artist}  -  ${auctionDB.title}`}
                    </Boldtext>
                  </Grid>
                  <Grid item xs={12}>
                    <Smalltext>
                      <ProfileImg src={userDB.profileImg} />
                      {userDB.id2}
                    </Smalltext>
                  </Grid>

                  {/* <Grid item xs={6}>
                                        조회수{auctionDB.view}
                                    </Grid> */}

                  <Grid item xs={12}>
                    좋아요
                    {auctionDB.LikeMusic}
                  </Grid>

                  <Grid item xs={12}>
                    <hr />
                    <Smalltext> {`${auctionDB.artist}is EDITION`}</Smalltext>
                  </Grid>

                  <Grid item xs={12}>
                    <hr />
                    <Boldtext>
                      {`Price:${auctionMusicDB.currentPrice}eth`}{" "}
                    </Boldtext>
                    <hr />
                  </Grid>

                  <Grid item xs={12}>
                    {userSessionAll[0].likeMusic === true ? (
                      <button onClick={() => upLikeMusic()}>
                        <img src={"/img/heart.png"} width={"30px"}></img>
                      </button>
                    ) : (
                      <button onClick={() => cancelLikeMusic()}>
                        <img src={"/img/fullheart.png"} width={"30px"}></img>
                      </button>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {userSessionAll[0].likeArtist === true ? (
                      <button onClick={() => upLikeArtist()}>
                        <img src={"/img/artist.png"} width={"30px"}></img>
                      </button>
                    ) : (
                      <button onClick={() => cancelLikeArtist()}>
                        <img src={"/img/fullartist.png"} width={"30px"}></img>
                      </button>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {userSessionAll[0].bookmarkMusic === true ? (
                      <button onClick={() => upBookmarkMusic()}>
                        <img src={"/img/bookmark.png"} width={"30px"}></img>
                      </button>
                    ) : (
                      <button onClick={() => cancelBookmarkMusic()}>
                        <img src={"/img/fullbookmark.png"} width={"30px"}></img>
                      </button>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <hr />
                    <Boldtext>
                      {" "}
                      {status === "경매종료" ? `💔${status}` : `❤️‍🔥${status}`}
                    </Boldtext>
                  </Grid>
                  <Grid item xs={12}>
                    {계정 === userDB.address ? (
                      <div>
                        본인의 상품입니다
                        <div>
                          남은 시간 : {restHour} : {restMin} : {restSec}
                        </div>
                        <div>경매 종료 날짜 {leftTime}s</div>
                      </div>
                    ) : (
                      <div>
                        {image.status == 1 ? (
                          leftTime > 0 ? (
                            isOwner ? (
                              <div>
                                ❤️‍🔥경매 종료 날짜 {leftTime}s❤️‍🔥
                                <br></br>
                                남은 시간 : {restHour} : {restMin} : {restSec}
                              </div>
                            ) : (
                              <div>
                                <div>
                                  ❤️‍🔥경매 종료 날짜 {leftTime}
                                  s❤️‍🔥
                                  <br></br>
                                  남은 시간 : {restHour} : {restMin} : {restSec}
                                </div>

                                <Button
                                  variant="outlined"
                                  onClick={handleClickOpen}
                                >
                                  입찰하기!{" "}
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                  <DialogTitle>입찰하다</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      입찰가를 채워주세요
                                    </DialogContentText>
                                    <TextField
                                      label="Your Bid"
                                      type="number"
                                      width={100}
                                      variant="standard"
                                      required
                                      onChange={(e) =>
                                        setNewBid(e.target.value)
                                      }
                                    />
                                    <br />
                                    <Select
                                      defaultValue={1}
                                      variant="standard"
                                      onChange={(e) =>
                                        setCurrenciesIU(e.target.value)
                                      }
                                    >
                                      <MenuItem value={1}>Wei</MenuItem>
                                      <MenuItem value={1000000000000}>
                                        Szabo
                                      </MenuItem>
                                    </Select>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose}>
                                      Cancel
                                    </Button>
                                    <Button onClick={() => bid()}>Bid</Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            )
                          ) : isOwner ? (
                            <Button
                              onClick={() => {
                                endOnBid();
                                onSubmit();
                              }}
                            >
                              이제 끝낼 수 있습니다.
                            </Button>
                          ) : (
                            <Button>
                              Time Up, 소유자가 종료하기를 기다리는 중.
                            </Button>
                          )
                        ) : (
                          <Button onClick={claim}>To be claimed</Button>
                        )}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    현재 우승자:{auction.winner}
                  </Grid>
                  <Grid item xs={12}>
                    <hr />
                    소유권 경로
                    {ownerShipTrans.map((address, index) => {
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        key={index}
                      >
                        {address} -&gt;
                      </Typography>;
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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

export default Market2;
