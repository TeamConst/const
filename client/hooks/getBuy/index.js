import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

// import getWeb3 from "../../lib/getWeb3";
// import contractJSON from "../../../build/contracts/NFTMarketplace.json";
// import contractJSON from "../../../build/contracts/NFTCollection.json";

const fetchBuy = async () => {
  // const parsed = await ky("http://localhost:3000/api/collections").json();
  const data = await axios.get("http://localhost:8080/api/getBuy", {});

  // const data = await axios.get("http://localhost:8080/api/bestCollection");
  // const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();

  // const result = parsed.filter((x) => x.id <= limit);
  // console.log(result);
  // return result;

  // console.log(parsed);
  // console.log(data);

  return data;
};

// const fetchLocals = async (limit = 10) => {
//   const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();
//   const result = parsed.filter((x) => x.id <= limit);

//   console.log(result);
//   return result;
// };

export { fetchBuy };
