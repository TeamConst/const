import Web3 from "web3";

//window variable is only available on browser
// not on nextjs server
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the nextjs server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  web3 = new Web3(provider);
}

export default web3;

// const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
//   web3 = new Web3(provider);
