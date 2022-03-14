import React from 'react';

const Web3Context = React.createContext({
  account: null,
  networkId: null,
  balance:null,
  loadAccount: () => {},
  loadNetworkId: () => {},
  loadBalance: () => {}

});

export default Web3Context;