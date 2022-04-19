import Layout from "../components/layout";
import ListenMusic from "../components/listenMusic";
import Mypage1 from "../components/mypage";
import BestCollection from "../components/NFTCollection/bestCollection";
import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import configuration from '../../build/contracts/Tickets.json';
import axios from "axios";
import { Typography, Stack, Paper, styled } from '@mui/material';
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import TicketCard from "../components/TicketCard";
import Grid from "@mui/material/Grid";
const Tickets = () => {
     const [tickets,setTickets] =useState([])
     const [Time,setTime] =useState([])
      console.log(configuration)
      const CONTRACT_ADDRESS = configuration.networks['5777'].address;
      const CONTRACT_ABI = configuration.abi;
      console.log(CONTRACT_ADDRESS)
      console.log(CONTRACT_ABI)
      const web3 = new Web3(
        Web3.givenProvider || 'http://127.0.0.1:7545'
      );
      
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      console.log(contract)
      const TOTAL_TICKETS = 3;
      // const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
    
    const main = async () => {
        for (let i = 0; i < TOTAL_TICKETS; i++) {
         let  ticket = await contract.methods.tickets(i).call();
         ticket.id = i;
         console.log(ticket)
           setTickets(tickets=> [...tickets,ticket.price] )

      }
    }

  
  useEffect(()=>{

    main()
  },[])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  console.log(tickets[0]/1e18)
  console.log(Time)
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <br/>
      <br/>
      <br/>
      <Grid container spacing={5}>
      <div >
          <div class="card" >
          </div>
        </div>
        <TicketCard
        price={tickets[0]/1e18}
        ticketname={"Const 1달 이용권"}
        id={0}
        />
         <TicketCard
        price={tickets[1]/1e18}
        ticketname={"Const 3달 이용권"}
        id={1}
        />
         <TicketCard
        price={tickets[2]/1e18}
        ticketname={"Const 5달 이용권"}
        id={2}
        />
        </Grid>
    </div>
  );
};

export default Tickets
