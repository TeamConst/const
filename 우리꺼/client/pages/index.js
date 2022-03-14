import Layout from "../components/layout";
import {NestedLayout} from "../components/nested-layout";



import Web3Provider from '../store/Web3Provider';
import CollectionProvider from '../store/CollectionProvider';
import MarketplaceProvider from '../store/MarketplaceProvider';
export default  function  Page ()  {

  return;
};

Page.getLayout = function getLayout(page) {
  return (
    <Web3Provider>
    <CollectionProvider>
    <MarketplaceProvider>
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
    </MarketplaceProvider>
    </CollectionProvider>
    </Web3Provider>
  );
};


