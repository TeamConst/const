import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchMyFavoriteNFTDB = async () => {
  const data = await axios.get(
    "http://localhost:8080/api/getMyFavoriteNFTDB",
    {}
  );

  return data;
};

export { fetchMyFavoriteNFTDB };
