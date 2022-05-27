import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import Web3Provider from "../store/Web3Provider";
import CollectionProvider from "../store/CollectionProvider";
import MarketplaceProvider from "../store/MarketplaceProvider";

// import "../styles/globals.css";
import web3 from "../connection/web3";
import React, { useContext, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Web3Context from "../store/web3-context";
import CssBaseline from "@mui/material/CssBaseline";
import CollectionContext from "../store/collection-context";
import MarketplaceContext from "../store/marketplace-context";
import NFTCollection from "../../abis/NFTCollection.json";
import NFTMarketplace from "../../abis/NFTMarketplace.json";

const Page = () => {};

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export default Page;
