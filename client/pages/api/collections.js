import getWeb3 from "../../lib/getWeb3";
import contractJSON from "../../../build/contracts/NFTCollection.json";
import { useEffect } from "react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    console.log("hi");

    // Process a POST request
  } else {
    // 음원

    // ipfs
    console.log(typeof window);
    if (typeof window !== undefined) {
      // truffle
      console.log("뜨니");
      // console.log(window);
      // const web3 = await getWeb3();
      // const accounts = await web3.eth.getAccounts();
      // const networkId = await web3.eth.net.getId();
      // const deployedAddress = contractJSON.networks[networkId].address;
      // const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);
      // console.log(contract);
    }
    // 컬렉션 클라에 쏴주는 곳
    const result = "ab";
    res.status(200).json(result);
    // Handle any other HTTP method
  }
}
