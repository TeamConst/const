import { useEffect, useContext, useRef, createRef } from "react";
import { useQuery } from "react-query";
import { fetchCollections } from "../../hooks";

// import web3 from '../../../connection/web3';
// import Web3Context from '../../../store/web3-context';
// import CollectionContext from '../../../store/collection-context';
// import MarketplaceContext from '../../../store/marketplace-context';
// import { formatPrice } from '../../../helpers/utils';
// import eth from '../../../img/eth.png';

import getWeb3 from "../../lib/getWeb3";
// import contractJSON from "../../../build/contracts/NFTMarketplace.json";
import contractJSON from "../../../build/contracts/NFTCollection.json";

const NFTCollection = () => {
  // const { data, isLoading, isFetching } = useQuery("collections", () =>
  //   fetchCollections()
  // );
  const { data, isLoading, isFetching } = useQuery("collections", () =>
    fetchCollections()
  );
  console.log(data);

  let pra;
  let praaccounts;
  useEffect(async () => {
    // 이해하기 쉬우라고 기본 코드로 썼음
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractJSON.networks[networkId].address;
    const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);

    pra = contract;
    praaccounts = accounts;

    // console.log(pra);

    const a = await web3.eth.getBlock(6);
    console.log(a);

    const totalSupply = await pra.methods.totalSupply().call();

    // console.log(totalSupply);
  });

  return <div>1</div>;
};

export default NFTCollection;
