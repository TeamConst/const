import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Link from "next/link";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import { fetchUserSession } from "../hooks";

// 객체로 바꾸자
const pagesYesSession = [
  ["ALL NFT", "constnft"],
  ["BUY NOW", "constbuy"],
  ["AUCTION", "constauction"],
  ["이용권 구매", "buyticket"],
  ["MyPage", "mypage"],
  ["MINTING", "mint"],
  ["Listen Music", "listen"],
  ["로그아웃", "logout"],
];

const pagesNoSession = [
  ["ALL NFT", "constnft"],
  ["BUY NOW", "constbuy"],
  ["AUCTION", "constauction"],
  ["로그인", "login"],
  ["회원가입", "signup"],
  ["Listen Music", "listen"],
];

// const pages = [
//   "DIGITAL NFT",
//   "REAL PAINTING NFT",
//   "NIKPLAY",
//   "NIKPLACE",
//   "SUPPORT",
//   "SELL MY NFT",
//   "NIKHOLDER",
//   "회원가입",
// ];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const { data, isLoading, isFetching } = useQuery(["getUserSession"], () =>
    fetchUserSession()
  );

  let a = 0;
  if (data) {
    a = 1;
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 타이포 디자인 비교하라고 일부러 냅둠 */}
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              CONST
            </Typography>
          </Link>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              CONST
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {a === 1 ? (
                <Box>
                  {pagesYesSession.map((page) => (
                    <Link href={`/${encodeURIComponent(page[1])}`}>
                      <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page[0]}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Box>
              ) : (
                <Box>
                  {pagesNoSession.map((page) => (
                    <Link href={`/${encodeURIComponent(page[1])}`}>
                      <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page[0]}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Box>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {a === 1 ? (
              <Box>
                {pagesYesSession.map((page) => (
                  <Link href={`/${encodeURIComponent(page[1])}`}>
                    <Button
                      key={page[0]}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page[0]}
                    </Button>
                  </Link>
                ))}
              </Box>
            ) : (
              <Box>
                {pagesNoSession.map((page) => (
                  <Link href={`/${encodeURIComponent(page[1])}`}>
                    <Button
                      key={page[0]}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page[0]}
                    </Button>
                  </Link>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link href={setting}>
                    <Typography textAlign="center">{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
