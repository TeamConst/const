import Layout from "../components/Layout/layout";
import Music from "../components/Minting/music";

const Mint = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <Music></Music>
      {/* <MintForm></MintForm> */}
    </div>
  );
};

export default Mint;
