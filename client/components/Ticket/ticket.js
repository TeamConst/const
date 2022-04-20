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
<<<<<<< HEAD

=======
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
import axios from "axios";
import configuration from "../../../build/contracts/Tickets.json";
import web3 from "../connection/web3";
import { useState, useEffect } from "react";

const tiers = [
<<<<<<< HEAD
  {
    id: 0,
=======
  { 
    id:0,
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    title: "1달권",
    price: "0.1eth",
    description: [
      "혜택쓸거임",
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
<<<<<<< HEAD
    buttonText: "Sign up for free",
=======
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    buttonText: "구매하기",
    buttonVariant: "outlined",
  },
  {
<<<<<<< HEAD
    id: 1,
    title: "3달권",
    subheader: "Most popular",
    price: "15",
=======
    id:1,
    title: "3달권",
    subheader: "Most popular",
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    price: "0.2eth",
    description: [
      "혜택쓸거임",
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
<<<<<<< HEAD
    buttonText: "Get started",
=======
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    buttonText: "구매하기",
    buttonVariant: "contained",
  },
  {
<<<<<<< HEAD
    id: 2,
    title: "5달권",
    price: "30",
=======
    id:2,
    title: "5달권",
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    price: "0.3eth",
    description: [
      "혜택쓸거임",
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
<<<<<<< HEAD
    buttonText: "Contact us",
=======
>>>>>>> 36706299f9fe9f7a493e878135fce0a984ce8638
    buttonText: "구매하기",
    buttonVariant: "outlined",
  },
];

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [Time, setTime] = useState([]);
  const CONTRACT_ADDRESS = configuration.networks["5777"].address;
  const CONTRACT_ABI = configuration.abi;

  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const TOTAL_TICKETS = 3;

  let account;
  const buyTicket = async (i) => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    await contract.methods.buyTicket(i).send({
      from: account,
      value: tickets[i],
    });
    console.log(tickets[i]);
    setTime(`${i + 1}년 회원권`);
    const rere = await axios.post("http://localhost:8080/api/updateuser", {
      ticket: `${i + 1}년 회원권`,
      id: 1,
    });
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
        sx={{ pt: 8, pb: 6 }}
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
      >
      </Container>
    </div>
  );
};

export default Ticket;
