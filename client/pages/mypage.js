import Header from "../components/Layout/header";
import Mypage1 from "../components/Mypage/mypage";
import Footer from "../components/Layout/footer";

import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchUserSession } from "../hooks";

const Mypage = () => {
  const { data, isLoading, isFetching } = useQuery(["getUserSession"], () =>
    fetchUserSession()
  );

  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <Mypage1> </Mypage1>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getUserSession"], () => fetchUserSession());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Mypage;
