import Header from "../components/Layout/Header";
import BestCollection from "../components/NFTCollection/bestCollection";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchBestCollections } from "../hooks";

const Bb = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <BestCollection></BestCollection>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery("bestCollections", () =>
  //   fetchBestCollections()
  // );

  // 프리페치에서 뭐가 오류가 나는데 고민를 해봐야겠다
  // data.pageParams = [null]
  // const a = queryClient.getQueriesData()[0][1];
  // const a = dehydrate(queryClient);
  // a.queries[0].state.data.config.data = "1";
  // console.log();
  return {
    props: {
      // JSON.parse(JSON.stringify(dehydrate(queryClient)))
      // dehydratedState: a,
    },
  };
}

export default Bb;
