// SEO를 사용하기 위해 이런것들을 사용해야한다
// 일단 알고만 있자
// import Head from "next/head";

// export default function Header() {
//   return (
//     <div>
//       <Head>
//         <title>This page has a title 🤔</title>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>

//       <h1>This page has a title 🤔</h1>
//     </div>
//   );
// }
import Head from "next/head";

import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

// 스타일을 여기서 할지 그냥 mui 쓸지 고민중
// import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Layouts Example</title>
      </Head>
      {/* <Header></Header> */}
      <Navbar></Navbar>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Layout;
