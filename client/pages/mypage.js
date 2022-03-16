import Layout from "../components/layout";
import Mypage1 from "../components/mypage";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchLocals } from "../hooks/locals";

const Mypage = () => {
  // const localsQuery = useQuery("locals", fetchLocals);
  // console.log(localsQuery);
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <Mypage1> </Mypage1>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(["locals", 10], () => fetchLocals(10));
  // await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Mypage;
