import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchUserSession } from "../hooks";

import Header from "../components/Layout/Header";
import SignupForm from "../components/Auth/signupForm";

const Signup = () => {
  const { data, isLoading, isFetching } = useQuery(["getUserSession"], () =>
    fetchUserSession()
  );

  return (
    <div>
      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <SignupForm></SignupForm>
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

export default Signup;
