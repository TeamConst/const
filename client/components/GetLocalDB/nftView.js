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

import { fetchUserSessionAll, fetchMusicDetailDB } from "../../hooks";

import { useState, useEffect } from "react";

import axios from "axios";
import styled from "styled-components";

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

const NFTView = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  // 가격 변동 그래프 만드려고
  const useUser1 = () => {
    const result = useQuery(["getMusicDetailDB"], () => fetchMusicDetailDB(id));
    return result;
  };

  const useUser2 = () => {
    const result = useQuery(["getUserSessionAll"], () => fetchUserSessionAll());
    return result;
  };

  const data1 = useUser1();
  const data2 = useUser2();

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

  let z = 0;
  let userSessionAll;
  if (data2.data) {
    z = 1;
    userSessionAll = data2.data.data;
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 15 }}>
          111
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default NFTView;
