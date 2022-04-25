

import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";
import Link from "next/link"
import { useEffect, useState, useRef } from "react";

import GetMyNFTDB from "../GetLocalDB/Mine/getMyNFTDB";
import GetMyBuyDB from "../GetLocalDB/Mine/getMyBuyDB";
import GetMyAuctionDB from "../GetLocalDB/Mine/getMyAuctionDB";
import styled from "styled-components";

export default function Home() {
  //   const D1 =()=>{
  //       return <div>내수익현황
  //         {/* <GetMyNFTDB></GetMyNFTDB> */}
  //         </div>
  //   }
  //   const D2=()=>{
  //       return <div>나의전체NFT
  //         <GetMyNFTDB></GetMyNFTDB>
  //         </div>
  //   }
  //   const D3 =()=>{
  //     return <div>    <GetMyBuyDB></GetMyBuyDB></div>
  // }
  // const D4 =()=>{
  //     return <div>      <GetMyAuctionDB></GetMyAuctionDB> </div>
  // }
  // const D5 =()=>{
  //     return <div>음원정보</div>
  // }
    const menuList = {
        0:  <GetMyNFTDB></GetMyNFTDB>,
        1:    <GetMyBuyDB></GetMyBuyDB>,
        2:    <GetMyAuctionDB></GetMyAuctionDB>,
        3: <div>내수익현황</div>,
        4:  <div>음원정보</div>,
   
      };
      const Box = styled.div`
      display: block;
  width: 200px;
  background-color: #000;
  color: #fff;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden; /* 반응형 애니메이션용 */
  transition: all 0.5s ease; /* 반응형 애니메이션 */\
`;
const Ul = styled.ul`
list-style: none;
margin: 0;
padding: 0;
`;


   const [menu,setMenu] =useState(0)
      const changeMenu = (menuIndex) =>{
        setMenu( menuIndex);
      }
  
 
    return (
    
    <aside>
  <nav>
  <div className="wrap">
  <Container maxWidth="lg" sx={{ py: 24 }}>
  <Grid container spacing={5}>
  <Grid item xs={3}>  <Box>
        <div className="menuBar">
          <Ul className="tabs">
            <li className={`${menu === 0? 'active': ''}`} onClick={() => changeMenu(0)}>나의전체NFT</li>
            <li className={`${menu === 1? 'active': ''}`} onClick={() => changeMenu(1)}>판매중인 나의 NFT</li>
            <li className={`${menu === 2? 'active': ''}`} onClick={() => changeMenu(2)}>경매중인 나의 NFT</li>
            <li className={`${menu === 3? 'active': ''}`} onClick={() => changeMenu(3)}>내 음원 수익</li>
            <li className={`${menu === 4? 'active': ''}`} onClick={() => changeMenu(4)}>음원정보</li>
          </Ul>
        </div></Box>
</Grid>
<Grid item xs={9}>
        <div >
          {menuList[menu]}
        </div>  
        </Grid>
        </Grid>
        </Container>
      </div>
  </nav>
</aside>
    );
  }    


