import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import axios from "axios";
import configuration from "../../../build/contracts/Tickets.json";
import web3 from "../connection/web3";
import { useState, useEffect } from "react";

import { useQuery } from "react-query";

import styled from "styled-components";

const Img = styled.img`
  text-align: center;
  width: 80%;
  border-radius: 5%;
`;
const Boldtext = styled.div`
  text-align: center;
  padding: 10px 20px 0px 20px;
`;

const tiers = [
  {
    id: 0,
    title: "1달권",
    price: "0.1eth",
    description: [
      "혜택쓸거임",
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "구매하기",
    buttonVariant: "contained",
  },
  {
    id: 1,
    title: "2달권",
    subheader: "제일 많이 찾는",
    price: "0.2eth",
    description: [
      "혜택쓸거임",
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "구매하기",
    buttonVariant: "contained",
  },
  {
    id: 2,
    title: "3달권",
    price: "0.3eth",
    description: [
      "혜택쓸거임",
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "구매하기",
    buttonVariant: "contained",
  },
];

const Ticket = () => {
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
  console.log(userSession);
  const [tickets, setTickets] = useState([]);
  const [Time, setTime] = useState([]);
  const CONTRACT_ADDRESS = configuration.networks["5777"].address;
  const CONTRACT_ABI = configuration.abi;

  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const TOTAL_TICKETS = 3;

  let account;
  const buyTicket = async (i) => {
    if (userSession.ticket === "이용권 없음") {
      const accounts = await web3.eth.requestAccounts();
      account = accounts[0];
      await contract.methods.buyTicket(i).send({
        from: account,
        value: tickets[i],
      });
      //시간
      let now = new Date(); // 현재 날짜 및 시간
      let oneMonthLater = new Date(now.setMonth(now.getMonth() + (i + 1))); // 한달 후

      let today = new Date().getTime(); //현재 날짜시간
      let dday = new Date(`${oneMonthLater}`).getTime(); //dday날짜 및 시간
      console.log(dday);

      setTime(`${i + 1}달 회원권`);
      const rere = await axios.post("http://localhost:8080/api/updateuser", {
        ticket: `${i + 1}달 회원권`,
        ticketTime: oneMonthLater,
        id: userSession.id,
      });
    } else {
      window.alert("구매할수 없습니다");
    }
  };
  const main = async () => {
    for (let i = 0; i < TOTAL_TICKETS; i++) {
      let ticket = await contract.methods.tickets(i).call();
      ticket.id = i;
      console.log(ticket);
      setTickets((tickets) => [...tickets, ticket.price]);
    }
  };

  useEffect(() => {
    main();
  }, []);
  // let today = new Date().getTime();
  // let dday = new Date("2022-04-20T06:02:08.571Z").getTime();
  // console.log(dday-today)
  if (userSession) {
    let today = new Date().getTime();
    let dday = new Date(`${userSession.ticketTime}`).getTime();

    if (dday - today <= 0 && userSession.ticket !== "이용권 없음") {
      console.log(dday - today);
      const rere = axios.post("http://localhost:8080/api/updateuser", {
        ticket: `이용권 없음`,
        ticketTime: "0",
        id: userSession.id,
      });
    }
  }
  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6, py: 32 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          이용권
        </Typography>
        <Boldtext>
          <Img src="/img/music.jpeg" />
        </Boldtext>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default MUI components with
          little customization. */}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  //   action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      buyTicket(tier.id);
                    }}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      ></Container>
    </div>
  );
};

export default Ticket;
