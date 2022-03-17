import Layout from "../components/layout";
import NFTCollection from "../components/NFTCollection/NFTCollection";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchCollections, fetchLocals } from "../hooks";

const Collection = () => {
  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <NFTCollection></NFTCollection>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  // const usersQuery = useQuery("users", fetchUsers);
  // const teamsQuery = useQuery("teams", fetchTeams);
  // const projectsQuery = useQuery("projects", fetchProjects);

  // 로컬에서 데이터 쓸고오기
  // s3 이미지, mysql 데이터들

  // await queryClient.prefetchQuery("collections", () => fetchCollections());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Collection;
