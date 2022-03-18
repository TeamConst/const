import Layout from "../components/layout";
import SignupForm from "../components/signupForm";

import Web3 from "web3";
import { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    //window variable is only available on browser
    // not on nextjs server
    // let web3;
    // if (
    //   typeof window !== "undefined" &&
    //   typeof window.ethereum !== "undefined"
    // ) {
    //   // We are in the browser and metamask is running.
    //   console.log("A");
    //   console.log(window.ethereum);
    //   window.ethereum.request({ method: "eth_requestAccounts" });
    //   web3 = new Web3(window.ethereum);
    // } else {
    //   // We are on the nextjs server *OR* the user is not running metamask
    //   console.log("B");
    //   console.log(window.ethereum);
    //   const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    //   web3 = new Web3(provider);
    // }
    // const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    //   web3 = new Web3(provider);
  });
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <SignupForm></SignupForm>
    </div>
  );
};

export default Signup;
