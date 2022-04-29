import { useRouter } from "next/router";

import Header from "../../../../components/Layout/header";
import Footer from "../../../../components/Layout/footer";
import GetMyAuction from "../../../../components/GetContract/Mine/getMyAuction";

import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const MyAuction = () => {
    return <GetMyAuction></GetMyAuction>;
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default MyAuction;
