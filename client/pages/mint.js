import Layout from "../components/layout";
import Music from "../components/music";
import MintForm from "../components/MintNFT/MintForm";

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
