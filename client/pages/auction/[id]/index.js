import Header from "../../../components/Layout/header";
import Footer from "../../../components/Layout/footer";
import SetAuction from "../../../components/GetContract/setAuction";

import { useQuery, dehydrate, QueryClient } from "react-query";

// import { fetchLocals } from "../../hooks/locals";

const Auction = () => {
    return (
        <div>
            <Header></Header>
            <SetAuction></SetAuction>
            <Footer></Footer>
        </div>
    );
};

// 여기서 SSG 하는 방법을 알아보아야 겠다

export default Auction;
