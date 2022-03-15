import * as React from "react";
//
import { useContext, useState } from 'react';
import Web3Context from '../store/web3-context';
import MarketplaceContext from '../store/marketplace-context';
import web3 from "../connection/web3";
import MintForm from "../components/Content/MintNFT/MintForm";
//
import Spinner from '../components/Layout/Spinner';

import CollectionContext from '../store/collection-context';
import NFTCollection from '../components/Content/NFTCollection/NFTCollection'
// import MarketplaceContext from '../../store/marketplace-context';
// d
const Mypage2 = () => {
    const collectionCtx = useContext(CollectionContext);
    // const marketplaceCtx = useContext(MarketplaceContext);
    
  const [fundsLoading, setFundsLoading] = useState(false);
  
  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  const connectWalletHandler = async() => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch(error) {
      console.error(error,"ㅇㅔ러");
    }

    // Load accounts
    web3Ctx.loadAccount(web3);
      web3Ctx.loadBalance(web3); 
  };
  // web3Ctx.loadAccount(web3);
  web3Ctx.loadBalance(web3);  



//   const claimFundsHandler = () => {
//     marketplaceCtx.contract.methods.claimFunds().send({ from: web3Ctx.account })
//     .on('transactionHash', (hash) => {
//       setFundsLoading(true);
//     })
//     .on('error', (error) => {
//       window.alert('Something went wrong when pushing to the blockchain');
//       setFundsLoading(false);
//     });
//   };
//   console.log("dada")
//   // 
// // 이벤트 ClaimFunds 구독
// console.log("dada")
//   marketplaceCtx.contract.events.ClaimFunds()
//   .on('data', (event) => {
//     console.log("dada")
//     marketplaceCtx.loadUserFunds(marketplaceCtx.contract, web3Ctx.account);
//     setFundsLoading(false);
//   })
//   .on('error', (error) => {
//     console.log(error);
//   });

  let etherscanUrl;

  if(web3Ctx.networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io'
  } else if(web3Ctx.networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io'
  } else if(web3Ctx.networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io'
  } else {
    etherscanUrl = 'https://etherscan.io'
  }
  
  return (
    <div className="container-fluid mt-2">
    <div className="row">
      <main role="main" className="col-lg-12 justify-content-center text-center">
        <div className="content mr-auto ml-auto">
          {/* <img src={logo} alt="logo" width="500" height="140" className="mb-2"/> */}
          {!collectionCtx.nftIsLoading && <MintForm />}
          {collectionCtx.nftIsLoading && <Spinner />}
        </div>
      </main>
    </div>
    <hr/>
    {!marketplaceCtx.mktIsLoading && <NFTCollection />}
    {marketplaceCtx.mktIsLoading && <Spinner />}
  </div>
  );
};

export default Mypage2;
