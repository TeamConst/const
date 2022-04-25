import { useRouter } from "next/router";

import Header from "../../../../components/Layout/header";
import Footer from "../../../../components/Layout/footer";
import GetMyNFT from "../../../../components/GetContract/Mine/getMyNFT";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchMyNFTDB } from "../../../../hooks";

const Buy = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isFetching } = useQuery(["getMyNFTDB"], () =>
    fetchMyNFTDB()
  );

  return (
    <div>
      <p>BuySell 파라미터 : {id}</p>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <GetMyNFT></GetMyNFT>
      <Footer></Footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getMyNFTDB"], () => fetchMyNFTDB());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Buy;
