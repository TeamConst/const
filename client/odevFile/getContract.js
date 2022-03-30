import { useEffect } from "react";

import getWeb3 from "../lib/getWeb3";
import contractJSON from "../../build/contracts/NFTCollection.json";

const GetContract = () => {
  useEffect(async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractJSON.networks[networkId].address;
    const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);

    console.log(contract);
  });

  return <div>컨트랙트 불러오는 예</div>;
};

export default GetContract;
