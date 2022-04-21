// import { useQuery, dehydrate, QueryClient } from "react-query";
// import { fetchLocals } from "../hooks";

// import Layout from "../components/Layout/layout";

// const Index = () => {
//   return <div>abcd111</div>;
// };

// Index.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

// // 전략을 이렇게 짜자
// // 여기서는 초반에 보여줄 전략을 가진다는 가정하에 이걸 쓰는 거야
// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   // const usersQuery = useQuery("users", fetchUsers);
//   // const teamsQuery = useQuery("teams", fetchTeams);
//   // const projectsQuery = useQuery("projects", fetchProjects);

//   // 로컬에서 데이터 쓸고오기
//   // s3 이미지, mysql 데이터들
//   // await queryClient.prefetchQuery(["locals", 10], () => fetchLocals(10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

// export default Index;

import Layout from "../components/Layout/layout";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchLocals } from "../hooks";

import AuctionCollection from "../components/Auction/AuctionCollection";
import GetVideo from "../components/GetLocalDB/getVideo";
import GetNowBuy from "../components/GetLocalDB/getNowBuy";
import GetNowAuction from "../components/GetLocalDB/getNowAuction";
import GetNowNFT from "../components/GetLocalDB/getNowNFT";
import ListenMusic from "../components/GetLocalDB/listenMusic";

const Page = () => {
  return (
    <div>
      <Layout></Layout>
      {/* <AuctionCollection /> */}
       <GetVideo></GetVideo>
      {/* <GetNowNFT></GetNowNFT> */}
      <GetNowBuy></GetNowBuy>
      <GetNowAuction></GetNowAuction>
      <ListenMusic></ListenMusic>
    </div>
  );
};

// Page.getLayout = function getLayout(page) {
//   return (
//     <div>
//     <Layout>

//       <NestedLayout>{page}</NestedLayout>
//        <div>dd</div>
//     </Layout></div>
//   );
// };

// 전략을 이렇게 짜자
// 여기서는 초반에 보여줄 전략을 가진다는 가정하에 이걸 쓰는 거야
// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   // const usersQuery = useQuery("users", fetchUsers);
//   // const teamsQuery = useQuery("teams", fetchTeams);
//   // const projectsQuery = useQuery("projects", fetchProjects);

//   // 로컬에서 데이터 쓸고오기
//   // s3 이미지, mysql 데이터들
//   // await queryClient.prefetchQuery(["locals", 10], () => fetchLocals(10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Page;
