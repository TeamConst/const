import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchLocals } from "../hooks";

const Page = () => {
  return;
};

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

// 전략을 이렇게 짜자
// 여기서는 초반에 보여줄 전략을 가진다는 가정하에 이걸 쓰는 거야
export async function getStaticProps() {
  const queryClient = new QueryClient();

  // const usersQuery = useQuery("users", fetchUsers);
  // const teamsQuery = useQuery("teams", fetchTeams);
  // const projectsQuery = useQuery("projects", fetchProjects);

  // 로컬에서 데이터 쓸고오기
  // s3 이미지, mysql 데이터들
  // await queryClient.prefetchQuery(["locals", 10], () => fetchLocals(10));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Page;
