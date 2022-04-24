// SEO를 사용하기 위해 이런것들을 사용해야한다

import Head from "next/head";
import Navbar from "./navbar";

const Header = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Const 🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar></Navbar>
    </div>
  );
};

export default Header;
