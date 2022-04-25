// React
import React, { useState } from "react";
// Next
import Link from "next/link";
import styled from "styled-components";
// MUI - Component
import {
  AppBar,
  Avatar,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Box,
  Button,
  MenuIcon,
} from "@mui/material";

import { indigo, yellow } from "@mui/material/colors";

// MUI - Custom Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useStyles } from "../../css/styles";

// React-query
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchUserSession } from "../../hooks";

// Navbar Index
const pagesYesSession = [
  ["ALL NFT", "indexNFT"],
  ["BUY NOW", "indexBuy"],
  ["AUCTION", "indexAuction"],
  ["이용권 구매", "buyticket"],
  ["CONST", ""],
  ["MyPage", "mypage"],
  ["MINTING", "mint"],
  ["Listen Music", "listen"],
  ["로그아웃", "logout"],
];

const pagesNoSession = [
  ["ALL NFT", "indexNFT"],
  ["BUY NOW", "indexBuy"],
  ["AUCTION", "indexAuction"],
  ["CONST", ""],
  ["로그인", "login"],
  ["회원가입", "signup"],
  ["Listen Music", "listen"],
];
const theme = createTheme({
  palette: {
    background: {
      main: "#FFFFFF",
    },
    button: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    primary: {
      main: indigo[200],
    },
    secondary: {
      main: yellow[500],
    },
    text: {
      black: "#000000",
      white: "#FFFFFF",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const Navbar = () => {
  const { data, isLoading, isFetching } = useQuery(["getUserSession"], () =>
    fetchUserSession()
  );

  let a = 0;
  if (data) {
    a = 1;
  }

  // const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color="background" elevation="0">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {a === 1 ? (
                <Box sx={{ mx: "auto" }}>
                  <Typography
                    noWrap
                    sx={{ display: { xs: "none", md: "flex" } }}
                    component="div"
                    color="text.black"
                  >
                    {pagesYesSession.map((page) => (
                      <IconButton
                        size="small"
                        edge="start"
                        color="primary"
                        sx={{ mr: 5 }}
                      >
                        {page[0] === "CONST" ? (
                          <Link href={`/${encodeURIComponent(page[1])}`}>
                            <img
                              src={"/img/ConstLogo.png"}
                              height="100px"
                              width="100px"
                            />
                          </Link>
                        ) : (
                          <Link href={`/${encodeURIComponent(page[1])}`}>
                            {page[0]}
                          </Link>
                        )}
                      </IconButton>
                    ))}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ mx: "auto" }}>
                  <Typography
                    noWrap
                    sx={{ display: { xs: "none", md: "flex" } }}
                    component="div"
                    color="dark"
                  >
                    {pagesNoSession.map((page) => (
                      <IconButton
                        size="small"
                        edge="start"
                        color="primary"
                        sx={{ mr: 5 }}
                      >
                        {page[0] === "CONST" ? (
                          <Link href={`/${encodeURIComponent(page[1])}`}>
                            <img
                              src={"/img/ConstLogo.png"}
                              height="100px"
                              width="100px"
                            />
                          </Link>
                        ) : (
                          <Link href={`/${encodeURIComponent(page[1])}`}>
                            {page[0]}
                          </Link>
                        )}
                      </IconButton>
                    ))}
                  </Typography>
                </Box>
              )}
            </Toolbar>

            {/* <div sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <div sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}> */}
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
