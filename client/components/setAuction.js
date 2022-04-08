import {
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QueryClient, useQuery, useQueryClient } from "react-query";
import React, { useState, useEffect } from "react";
import { fetchAuction } from "../hooks";
import io from "socket.io-client";

import web3 from "./connection/web3";
import { fetchContract } from "../hooks";
import ImageNFTMarketplace from "../../build/contracts/ImageMarketplace.json";

const theme = createTheme();

const getContract = async () => {
  try {
    // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);

    // Get the contract instance.
    let balance =
      accounts.length > 0
        ? await web3.eth.getBalance(accounts[0])
        : await web3.utils.toWei("0");
    balance = await web3.utils.fromWei(balance, "ether");
    console.log("balance", balance);

    const networkId = await web3.eth.net.getId();
    console.log("networkId", networkId);

    const deployedAddress = ImageNFTMarketplace.networks[networkId].address;
    const NFTMarketplaceInstance = new web3.eth.Contract(
      ImageNFTMarketplace.abi,
      deployedAddress
    );
    console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);

    return NFTMarketplaceInstance;
  } catch (error) {
    // 위의 작업에 대한 오류를 포착합니다.
    alert(
      "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
    );
    console.error(error);
  }
};

const SetAuction = () => {
  //   const [옥션, 옥션변경] = useState();
  //   const clientData = async () => {
  //     const Contract = await getContract();
  //     옥션변경(Contract);
  //   };
  //   clientData();

  //   console.log(옥션);
  // 인스턴스를 그 상황에서 만드는 건 ok인데 이걸 어디에 계속 보내거나 하는 건 지양해야 하는 듯
  //   const { data, isLoading, isFetching } = useQuery(["getContract"], () =>
  //     fetchContract()
  //   );

  //   console.log(data);
  return <div>1</div>;
};

export default SetAuction;
