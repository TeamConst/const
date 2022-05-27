import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import Web3Provider from "../store/Web3Provider";
import CollectionProvider from "../store/CollectionProvider";
import MarketplaceProvider from "../store/MarketplaceProvider";

import "../styles/globals.css";
import web3 from "../connection/web3";
import React, { useContext, useEffect } from "react";
import Mypage2 from "./mypage2";


const MyApp = ({ Component, pageProps }) => {
  // const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(

    <Web3Provider>
      <CollectionProvider>
        <MarketplaceProvider>
           <Mypage2/>
          <Component {...pageProps} />
        </MarketplaceProvider>
      </CollectionProvider>
    </Web3Provider>
 
  );
};

export default MyApp;
