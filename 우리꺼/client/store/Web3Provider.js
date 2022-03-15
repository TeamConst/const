import { useReducer } from 'react';

import Web3Context from './web3-context';

const defaultWeb3State = {
  account: null,
  networkId: null,
  balance: null
};

const web3Reducer = (state, action) => {
  if(action.type === 'ACCOUNT') {
    return {
      account: action.account,
      networkId: state.networkId,
      balance:state.balance
    };
  } 
  
  if(action.type === 'NETWORKID') {
    return {
      account: state.account,
      networkId: action.networkId,
      balance:state.balance,
    };
  }
  if(action.type === 'BALANCE') {
    return {
      balance:action.balance,
      account: state.account,
      networkId: state.networkId,
    };
  }
  return defaultWeb3State;
};

const Web3Provider = props => {
  const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State);
  
  const loadAccountHandler = async(web3) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await web3.eth.getBalance(accounts[0]);
    dispatchWeb3Action({type: 'ACCOUNT', account: account});
    console.log(account)
    console.log(balance)
    return account;

  };

  const loadNetworkIdHandler = async(web3) => {
    console.log(web3)
    const networkId = await web3.eth.net.getId();
    dispatchWeb3Action({type: 'NETWORKID', networkId: networkId});
    return networkId;   
  };
  const loadBalanceIdHandler = async(web3) => {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    dispatchWeb3Action({type: 'BALANCE', balance: balance});
    return balance;   
  };
  
  const web3Context = {
    account:web3State.account,
    networkId: web3State.networkId,
    balance:web3State.balance,
    loadAccount: loadAccountHandler,
    loadNetworkId: loadNetworkIdHandler,
    loadBalance:loadBalanceIdHandler
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;