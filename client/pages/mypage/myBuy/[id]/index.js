import { useRouter } from "next/router";

import Header from "../../../../components/Layout/header";
import Footer from "../../../../components/Layout/footer";
import GetMyBuy from "../../../../components/GetContract/Mine/getMyBuy";

import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const Buy = ({id2}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>BuySell 파라미터 : {{id2}}</p>

      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <GetMyBuy></GetMyBuy>
      <Footer></Footer>
    </div>
  );
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default Buy;
