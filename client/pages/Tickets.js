import Layout from "../components/layout";
import ListenMusic from "../components/listenMusic";
import Mypage1 from "../components/mypage";
import BestCollection from "../components/NFTCollection/bestCollection";

import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import configuration from '../../build/contracts/Tickets.json';
import axios from "axios";

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
      
      let account;
      const buyTicket = async (i) => {
        const accounts = await web3.eth.requestAccounts();
        account = accounts[0];
        await contract.methods.buyTicket(i).send({
          from: account,
          value: tickets[i]
        });
        console.log(tickets[i])
        setTime(`${i+1}년 회원권`)
        const rere = await axios.post("http://localhost:8080/api/updateuser", {ticket:`${i+1}년 회원권`,id:1});
      }
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
  console.log(tickets[0]/1e18)
  console.log(Time)
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      
      <div >
          <div class="card" >
            <div class="card-img-top p-4" >
           이용권 구입
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div >
              <div >
               
                <span >이용권1</span> <h5 >${tickets[0]/1e18} ETH</h5>
              </div>
              <button onClick={()=>{buyTicket(0)}} >Buy</button>
              <div >
              <br/>
                <span >이용권2</span>  <h5 >${tickets[1]/1e18*2} ETH</h5>
              </div>
              <button onClick={()=>{buyTicket(1)}}>Buy</button>
              <div >
              <br/>
                <span >이용권3</span>   <h5 >${tickets[2]/1e18*3} ETH</h5>
              </div>
              <button onClick={()=>{buyTicket(2)}} >Buy</button>
            </div>
          </div>
        </div>
    
    //

    </div>
  );
};

export default Tickets
