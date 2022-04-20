


import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import configuration from '../../build/contracts/Tickets.json';
import axios from "axios";





const TicketCard= ({price,ticketname,id})=>{  

    var 현재상태 = id;
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
         value: tickets[i],
       });
       console.log(tickets[i])
       setTime(`${i+1}년 회원권`)
       const rere = await axios.post("http://localhost:8080/api/updateuser", {ticket:`${i+1}년 회원권`,id:1});
    //    await props.Contract.methods.beginAuction(tokenID, minBid2, duration2).send({ from: props.accountAddress });
     }
   const main = async () => {


    let currentTime = Date.parse(new Date()) / 1000;



       for (let i = 0; i < TOTAL_TICKETS; i++) {
        let  ticket = await contract.methods.tickets(i).call();
        ticket.id = i;
        console.log(ticket.endTime)
          setTickets(tickets=> [...tickets,ticket.price] )
          console.log(currentTime)
          console.log(ticket.endTime)


        let leftTime = (ticket.endTime - currentTime);
           console.log(leftTime,`${i+1}이용권`)
     }



   }
   const tick = async () => {
		
    let currentTime = Date.parse(new Date()) / 1000;
   console.log(currentTime)
//    let leftTime = (auction2.endTime - currentTime);
}
 tick()
 useEffect(()=>{

   main()
 },[])
    const price2 = price;
    const ticketname2 = ticketname;

    const id2 = id;
     

    console.log(price2)
    console.log(ticketname2)
    console.log(id2)
    return (
        <div class="ticket">
            <div class="left">
                <div class="image">
                    <p class="admit-one">
                        <span>ADMIT ONE</span>
                        <span>ADMIT ONE</span>
                        <span>ADMIT ONE</span>
                    </p>
                    <div class="ticket-number">
                        <p>
                            #20030220
                        </p>
                    </div>
                </div>
                <div class="ticket-info">
                    <p class="date">
                        <span>TUESDAY</span>
                        <span class="june-29">JUNE 29TH</span>
                        <span>2022</span>
                    </p>
                    <div class="show-name">
                        <h1>SOUR Prom</h1>
                        <h2>{ticketname2}</h2>
                    </div>
                    <div class="time">
                        <p>8:00 PM <span>TO</span> 11:00 PM</p>
                        <p>DOORS <span>@</span> 7:00 PM</p>
                    </div>
                    <p class="location"><span>East High School</span>
                        <span class="separator"><i class="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
                    </p>
                </div>
            </div>
            <div class="right">
                <p class="admit-one">
                    <span>ADMIT ONE</span>
                    <span>ADMIT ONE</span>
                    <span>ADMIT ONE</span>
                </p>
                <div class="right-info-container">
                    <div class="show-name">
                        <h1>SOUR Prom</h1>
                    </div>
                    <div class="time">
                        <p>8:00 PM <span>TO</span> 11:00 PM</p>
                        <p>DOORS <span>@</span> 7:00 PM</p>
                    </div>
                    <div class="barcode">
                        <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code"/>
                    </div>
                    <p class="ticket-number">
                    {
        { 
           0 :   <button onClick={()=>{buyTicket(0)}} >Buy</button>,
           1 :  <button onClick={()=>{buyTicket(1)}} >Buy</button>,
           2 :   <button onClick={()=>{buyTicket(2)}} >Buy</button>
        }[현재상태]
      }

                
                    </p>
                </div>
            </div>
        </div>)
}
export default TicketCard