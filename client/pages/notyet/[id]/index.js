import { useRouter } from "next/router";

import Header from "../../../components/Layout/header";
import Footer from "../../../components/Layout/footer";
import NFTView from "../../../components/GetLocalDB/nftView";
import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchSetBuy } from "../../../hooks";

// import { fetchLocals } from "../../hooks/locals";

const NotYet = () => {
    return (
        <div>
            <Header></Header>
            <NFTView></NFTView>
            <Footer></Footer>
        </div>
    );
};

export default NotYet;
