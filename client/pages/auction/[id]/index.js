import { useRouter } from "next/router";

import Header from "../../../components/Layout/Header";
import SetAuction from "../../../components/GetContract/setAuction";

import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const Auction = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>Auction 파라미터 : {id}</p>

      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <SetAuction></SetAuction>
    </div>
  );
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default Auction;
