import Layout from "../components/layout";
import NFTCollection from "../components/NFTCollection/NFTCollection";

const Collection = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <NFTCollection></NFTCollection>
    </div>
  );
};

export default Collection;
