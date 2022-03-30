import { useRouter } from "next/router";

import Layout from "../../../components/layout";
import Market from "../../../components/market";

import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const BuySell = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>BuySell 파라미터 : {id}</p>

      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Layout></Layout>
      <Market></Market>
    </div>
  );
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default BuySell;
