import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { fetchLocals } from "../hooks/locals";
import { useEffect ,useState} from "react";
import web3 from "../components/connection/web3";
import MintedImages from "./MintedImages/index";
import { fetchMusics } from "../hooks";
import axios from "axios";
//
import CardMedia from "@mui/material/CardMedia";
//
import Link from "next/link";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ImageCard from "./ImageCard/ImageCard";
//
const mdTheme = createTheme();
const theme = createTheme();
console.log("wev3",web3)
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
 
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [Contract, setContract] = useState(null);
  const [ImageCount, setImageCount] = useState(0);
  const [Images, setImages] = useState([]);
  const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
  const [lastMintTime, setLastMintTime] = useState(null);
  const [Auctions,setAuctions] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  // const [ready, setReady] = useState(false);
 const [d,setd]= useState(false)
  let ImageNFTMarketplace = {};
  try {
    ImageNFTMarketplace = require("../../build/contracts/ImageMarketplace.json");
  } catch (e) {
    console.log(e);
  }
  console.log(ImageNFTMarketplace)
  const { data, isLoading, isFetching } = useQuery(["musics"], () =>
    fetchMusics()
  );
  

 
  
 

  const [이미지, 이미지변경] = useState();

 

  console.log(data);
  let musics;
  let a = 0;
  if (data) {
    musics = data.data;
    a = 1;
  }
  
  const setupBlockchain = async () => {
    seta(false);
    let ImageNFTMarketplace = {};

    try {
      ImageNFTMarketplace = require("./build/contracts/ImageMarketplace.json");
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
        for (let i = 1; i <= ImageCount; i++) {
          let image = await NFTMarketplaceInstance.methods
            .imageStorage(i)
            .call();
          setImages(Images => [...Images, image] );
          console.log(...Images,image)
          let auction = await NFTMarketplaceInstance.methods
            .auctions(i)
            .call();
          let auction2 =[...Auctions,auction];
          console.log(auction2);
          setAuctions(Auctions =>[...Auctions,auction]);
          console.log(auction.endTime);
          // console.log("auction",auction);
          console.log("auctions",Auctions);
        }
       console.log(Auctions)
        let ImageNumOfAccount = await NFTMarketplaceInstance.methods
          .getOwnedNumber(accounts[0])
          .call();
        setContract(NFTMarketplaceInstance);
        setAccountAddress(accounts[0]);
        setAccountBalance(balance);
        setImageCount(ImageCount);
        setImageNumOfAccount(ImageNumOfAccount);
        setReady(true)
       
      } else throw "스마트 연락처에 연결하지 못했습니다.";
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
      );
      console.error(error);
    }
  };
  (async function componentWillMount(){
    if (d == true) {
      setupWeb3();
      setupBlockchain();
      }
  }());
 

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  마이페이지
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>                
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  접속 관리
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  회원정보 수정
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  나의 NFT
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  자세히 보기
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진1
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      아티스트
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      좋아요 수
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      곡 별 재생시간 등등
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  사진2
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      아티스트
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      좋아요 수
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box bgcolor="info.main" color="info.contrastText" p={2}>
                      곡 별 재생시간 등등
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  이용권 정보
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  총 재생시간
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  청취 곡 수
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box bgcolor="info.main" color="info.contrastText" p={2}>
                  Recently Played 등등
                </Box>
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
          <br/>
          <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* <Title>Recent Orders</Title> */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>순위</TableCell>
                <TableCell>노래제목</TableCell>
                <TableCell>좋아요</TableCell>
              </TableRow>
            </TableHead>
            <Link href={`/buysell/${encodeURIComponent(a.id)}`}>dd</Link>
        
            <TableBody>
              {a === 1 ? (
                musics.map((a) => (
                    
                  
                  <TableRow key={a.title}>
       
                    <TableCell>{a.title}</TableCell>
                    {/* <img src={`https://const123.s3.ap-northeast-2.amazonaws.com/image/2.jpg`}/> */}
                    <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image={`https://const123.s3.ap-northeast-2.amazonaws.com/image/${a.id}.jpg`}
                        alt="random"
                      />
                 
                    <TableCell
                      // onClick={() => {
                      //   changeMusic(a.CID);
                      // }}
                    >
                      {a.id}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        upLike(a.title);
                      }}
                    >
                      {a.LikeMusic}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <h1>아님</h1>
              )}
            </TableBody>
          </Table>
          
        </Box>
      </ThemeProvider>

      {/* 테이블 나열하고 클릭시 */}
      {/* AudioPlayer 실행 */}

      {/* <AudioPlayer
        autoPlay
        // src="https://ipfs.io/ipfs/QmXmsjFBRPEeJ9US2QkNgrDmHgUb6ajSRrcfprSFuTyDoM"
        src={음악}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      /> */}
      
    </div>  <MintedImages
          accountAddress={accountAddress}
          Images={Images}
          ImageNumOfAccount={ImageNumOfAccount}
          Contract={Contract}
          Auctions={Auctions}
          currentTime={currentTime}
        />
    
    </div>
    
  );
};

export default Mypage1;
