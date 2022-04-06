import Layout from "../components/layout";
import ListenMusic from "../components/listenMusic";
import Mypage1 from "../components/mypage";
import BestCollection from "../components/NFTCollection/bestCollection";

const Practice = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <ListenMusic></ListenMusic>
      <BestCollection></BestCollection>
    </div>
  );
};

export default Practice;
