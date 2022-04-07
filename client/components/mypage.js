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
import { fetchBestCollections } from "../hooks";
import axios from "axios";
//
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
 

  const { data, isLoading, isFetching } = useQuery(["bestCollections"], () =>
  fetchBestCollections()
);


// prefetch 이슈가 있어서 일단 양념쳐서 되게 해놨다
let pictures;
let a = 0;
if (data) {
  pictures = data.data;
  a = 1;
}
// console.log(pictures.map[0]);
console.log(isLoading);
console.log(isFetching);
console.log(data)

 

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
          <div>
      <ThemeProvider theme={theme}>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {a === 1 ? (
              pictures.map((a) => (
                // 아 이렇게 쓰는 거구나 씨발
                <Link href={`/buysell/${encodeURIComponent(a.Key)}`}>
                  <Grid item key={a.Key} xs={12} sm={6} md={4}>
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
                        image={a.URL}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {a.title}
                        </Typography>
                        <Typography>{a.Key}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Link>
              ))
            ) : (
              <h1>아님</h1>
            )}
          </Grid>
        </Container>
    
      </ThemeProvider>
    </div>

  
      
    </div> 
        
    
    </div>
    
  );
};

export default Mypage1;
