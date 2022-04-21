import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useEffect, useState ,useRef} from "react";
import web3 from "../connection/web3";
import MintedImages from "../MintedImages/index";
import { fetchBestCollections } from "../../hooks";
import axios from "axios";
//
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
//
import Link from "next/link";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ImageCard from "../ImageCard/ImageCard";

import GetMyBuy from "../GetContract/Mine/getMyBuy";
import GetMyNFT from "../GetContract/Mine/getMyBuy";
// import GetMyAuction from "../GetContract/Mine/getMyAuction";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";
//
import Web3 from "web3";
//
import avatar from "../../images/1.jpg"
import styled from "styled-components";
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
box-shadow: 0px 10px 30px hsl(185, 75%, 35%);
`;
const Followers = styled.div`
flex: 1;
`;
const Socialcontainer = styled.div`
display: flex;
border-top: solid rgb(206, 206, 206) 1px;
text-align: center;
`;
const Normaltext  = styled.div`
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

async function setupWeb3() {
  console.log("hihid");
  if (window.ethereum) {
    console.log("확인");
    window.web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum.send("eth_requestAccounts");
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("주입된 web3가 감지되었습니다.");
  }
  // Fallback to localhost; use dev console port by default...
  else {
    console.alert(
      "Infura/Local web3를 사용하여 주입된 web3 인스턴스가 없습니다."
    );
  }
}

const Mypage1 = () => {
  //

    
       const data= {
          name:"Rita Correia",
          age:"32",
          city:"London",
          followers:"80K",
          likes:"803K",
          photos:"1.4K"
        }
  console.log(data.name)


  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions, setAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [ready, setReady] = useState(false);

  const [b, seta] = useState(true);

  const setupBlockchain = async () => {
    seta(false);
    let ImageNFTMarketplace = {};

    try {
      ImageNFTMarketplace = require("../../../build/contracts/ImageMarketplace.json");
    } catch (e) {
      console.log(e);
    }
    try {
      // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      console.log(accounts);
      // Get the contract instance.
      let balance =
        accounts.length > 0
          ? await web3.eth.getBalance(accounts[0])
          : await web3.utils.toWei("0");
      balance = await web3.utils.fromWei(balance, "ether");

      console.log("balance", balance);

      const networkId = await web3.eth.net.getId();
      let NFTMarketplaceInstance = null;
      let deployedNetwork = null;

      // Create instance of contracts

      console.log("networkId", networkId);

      if (ImageNFTMarketplace.networks) {
        deployedNetwork = ImageNFTMarketplace.networks[networkId];
        if (deployedNetwork) {
          NFTMarketplaceInstance = new web3.eth.Contract(
            ImageNFTMarketplace.abi,
            deployedNetwork.address
          );
        }
      }
      console.log("ImageNFTMarketplace", ImageNFTMarketplace);
      console.log("deployedNetwork", deployedNetwork);
      console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);
      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();
        console.log(ImageCount);
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods
            .imageStorage(i)
            .call();
          setImages((Images) => [...Images, image]);
          console.log(...Images, image);
          let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
          let auction2 = [...Auctions, auction];
          console.log(auction2);
          setAuctions((Auctions) => [...Auctions, auction]);
          console.log(auction.endTime);
          // console.log("auction",auction);
          console.log("auctions", Auctions);
        }
        console.log(Auctions);
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
        // setReady(true)
      } else throw "스마트 연락처에 연결하지 못했습니다.";
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
      );
      console.error(error);
    }
  };

  (async function componentWillMount() {
    if (b == true) {
      setReady(false);
      setupWeb3();
      setupBlockchain();
    }
  })();

  // 여기서부터 쓰면 댐 위에 볼 필요 없음

  // 컨트랙트 처리 위해서
  const useUser1 = () => {
    const result = useQuery(["getUserSession"], () => fetchUserSession());
    return result;
  };

  const data1 = useUser1();

  let a = 0;
  let userSession;
  if (data1.data) {
    a = 1;
    userSession = data1.data.data;
  }
  console.log(userSession)
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
      if(userSession){
      let today = new Date().getTime();
      let dday = new Date(`${userSession.ticketTime}`).getTime(); 
       lastTime =Math.ceil((dday - today) / (1000 * 60 * 60 * 24));
  
  }
  console.log(lastTime)
  if(userSession){
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime(); 
  
    
     if(dday-today <= 0 &&userSession.ticket !=="이용권 없음" ){ 
       console.log(dday-today)
       const rere =  axios.post("http://localhost:8080/api/updateuser", {
        ticket: `이용권 없음`,
        ticketTime:"0",
        id: userSession.id
      }
      );
      }
  


	
    }
    const fileInput = useRef(null)
  
    const onChange =async (e) => {
      if(e.target.files[0]){
        // setImage(e.target.files[0])
        const image = e.target.files[0];
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        imageFormData.append("title", image.name);
        imageFormData.append("CID", image.name);
        const resultImage = await axios.post(
          "http://localhost:8080/api/mint/image",
          imageFormData
        );
         const rere =  axios.post("http://localhost:8080/api/updateuser2", {
          profileImg:`https://const123.s3.ap-northeast-2.amazonaws.com/image/${image.name}.jpg`,
          id: userSession.id
         
        }
        )
    }
            console.log(rere)
      //화면에 프로필 사진 표시
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    // setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />  

        <Container maxWidth="lg">
          <main>
            <button onClick={claimFundsHandler} className="btn btn-success">
              구매 완료 된 이더 받기
            </button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              버튼버튼
            </Button>
            {a === 1 ? (

              
              <Grid container spacing={5}>
                
                <Grid item xs={12}>
                <Cardcontainer>
			<Header>
      <Img 
        src={`${userSession.profileImg}`} 
        style={{margin:'20px'}} 
        size={200} 
        onClick={()=>{fileInput.current.click()}}/>
          <input 
 	type='file' 
    	style={{display:'none'}}
        accept='image/jpg,impge/png,image/jpeg' 
        name='profile_img'
        onChange={onChange}
        ref={fileInput}/>
			</Header>
			<Boldtext>
      {userSession.name} <span className="normal-text">나이/랭크</span>
			</Boldtext>
			<Normaltext>{userSession.artist}</Normaltext>
			<Socialcontainer>
				<Followers>
					<Boldtext>{ImageNumOfAccount}</Boldtext>
					<Smallertext> 소유한 NFTS의 총 수</Smallertext>
				</Followers>
				<Followers className="likes">
					<Boldtext>{accountBalance}/eth</Boldtext>
					<Smallertext>잔액</Smallertext>
				</Followers>
				<Followers className="photos">
					<Boldtext>     {`${userSession.ticket}${lastTime}일남음`}</Boldtext>
					<Smallertext>이용권 정보</Smallertext>
				</Followers>
			</Socialcontainer>
		</Cardcontainer>
                  {/* <Box bgcolor="info.main" color="info.contrastText" p={2}>
         
                  </Box> */}
                </Grid>
                <Grid item xs={9}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext> 내 수익 현황</Boldtext></Followers>
                    
                  </Cardcontainer>
                </Grid>
                <Grid item xs={3}>
                  {/* <Link href={`/buysell/${encodeURIComponent(a.Key)}`}> */}
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>NFT관리하기</Boldtext></Followers>
                    
                  </Cardcontainer>
                  </Link>
                </Grid>
                <Grid item xs={9}>
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>나의 전체 </Boldtext></Followers>
                    
                  </Cardcontainer>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myNFT/${accountAddress}`}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>  자세히보기 </Boldtext></Followers>
  
                  </Cardcontainer>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyNFTDB></GetMyNFTDB>
                  {/* <GetMyNFT></GetMyNFT> */}
                </Grid>
                <Grid item xs={9}>
                <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext> 판매중인 나의 NFT </Boldtext></Followers>
  
                  </Cardcontainer>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myBuy/${accountAddress}`}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>  자세히보기 </Boldtext></Followers>
  
                  </Cardcontainer>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyBuyDB></GetMyBuyDB>
                  {/* <GetMyBuy></GetMyBuy> */}
                </Grid>

                <Grid item xs={9}>
                <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>   경매중인 나의 NFT </Boldtext></Followers>
  
                  </Cardcontainer>
                </Grid>
                <Grid item xs={3}>
                  <Link href={`/mypage/myAuction/${accountAddress}`}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>  자세히 보기 </Boldtext></Followers>
  
                  </Cardcontainer>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <GetMyAuctionDB></GetMyAuctionDB>
                  {/* <GetMyAuction></GetMyAuction> */}
                  <MintedImages
                    accountAddress={accountAddress}
                    Images={Images}
                    ImageNumOfAccount={ImageNumOfAccount}
                    Contract={Contract}
                    Auctions={Auctions}
                    currentTime={currentTime}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>   이용권 정보 </Boldtext></Followers>
                    {`이용권:${userSession.ticket}${lastTime}일남음`}
                  </Cardcontainer>
                </Grid>
                <Grid item xs={4}>
                <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>  내 음원의 총 재생시간 </Boldtext></Followers>
  
                  </Cardcontainer>
                </Grid>
                <Grid item xs={4}>
                <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>  내음원을 들은 총 재생 횟수 </Boldtext></Followers>
  
                  </Cardcontainer>
                </Grid>
                <Grid item xs={4}>
                <Cardcontainer bgcolor="info.main" color="info.contrastText" p={2}>
                    <Followers> <Boldtext>   내가 최근 들은 곡 Recently Played 등등 </Boldtext></Followers>
  
                  </Cardcontainer>
                </Grid>
              </Grid>
            ) : (
              <div>오류임</div>
            )}
          </main>
        </Container>
      </ThemeProvider>
      
    </div>
  );
};

export default Mypage1;
