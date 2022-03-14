import * as React from "react";
//
import { useContext, useState } from 'react';
import Web3Context from '../store/web3-context';
import MarketplaceContext from '../store/marketplace-context';
import web3 from "../connection/web3";
import { formatPrice } from '../helpers/utils';
//
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const Mypage = () => {
  const [fundsLoading, setFundsLoading] = useState(false);
  
  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  const connectWalletHandler = async() => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch(error) {
      console.error(error,"ㅇㅔ러");
    }

    // Load accounts
    web3Ctx.loadBalance(web3);
    web3Ctx.loadAccount(window.ethereum);
    console.log(web3Ctx)
     web3Ctx.loadBalance(window.ethereum); 
  };
  web3Ctx.loadAccount(web3);
  web3Ctx.loadBalance(web3);  
  console.log(web3Ctx)

  console.log("dada")
  const claimFundsHandler = () => {
    marketplaceCtx.contract.methods.claimFunds().send({ from: web3Ctx.account })
    .on('transactionHash', (hash) => {
      setFundsLoading(true);
    })
    .on('error', (error) => {
      window.alert('Something went wrong when pushing to the blockchain');
      setFundsLoading(false);
    });
  };
  console.log("dada")
  // 
// 이벤트 ClaimFunds 구독
console.log("dada")
  marketplaceCtx.contract.events.ClaimFunds()
  .on('data', (event) => {
    console.log("dada")
    marketplaceCtx.loadUserFunds(marketplaceCtx.contract, web3Ctx.account);
    setFundsLoading(false);
  })
  .on('error', (error) => {
    console.log(error);
  });

  let etherscanUrl;

  if(web3Ctx.networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io'
  } else if(web3Ctx.networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io'
  } else if(web3Ctx.networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io'
  } else {
    etherscanUrl = 'https://etherscan.io'
  }
  
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
                  반갑습니다 00님
                  <li className="nav-item">
          {web3Ctx.account && 
            <a 
              className="nav-link small" 
              href={`${etherscanUrl}/address/${web3Ctx.account}`}
              target="blank"
              rel="noopener noreferrer"
            >
              {web3Ctx.account}
             
            </a>}
            <h1> {web3Ctx.balance}eth</h1>
          {!web3Ctx.account && 
            <button 
              type="button" 
              className="btn btn-info text-white" 
              onClick={connectWalletHandler} 
            > 
              Connect your wallet
            </button>}
        </li>
        <li className="nav-item">
          {marketplaceCtx.userFunds > 0 && !fundsLoading &&
            <button 
              type="button" 
              className="btn btn-info btn-block navbar-btn text-white" 
              onClick={claimFundsHandler}
            >          
              {`CLAIM ${formatPrice(marketplaceCtx.userFunds)} ETH`}
            </button>}
          {fundsLoading &&
            <div class="d-flex justify-content-center text-info">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
          </div>}          
        </li>
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
    </div>
  );
};

export default Mypage;
