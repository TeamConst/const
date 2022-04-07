import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

// import contractJSON from "../../../build/contracts/NFTMarketplace.json";
import contractJSON from "../../../build/contracts/NFTCollection.json";

const fetchCollections = async () => {
  // const parsed = await ky("http://localhost:3000/api/collections").json();
  const data = await axios.get("http://localhost:3000/api/collections");
  // const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();

  // const result = parsed.filter((x) => x.id <= limit);
  // console.log(result);
  // return result;

  // console.log(parsed);
  console.log(data);

  return parsed;
};

// const fetchLocals = async (limit = 10) => {
//   const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();
//   const result = parsed.filter((x) => x.id <= limit);

//   console.log(result);
//   return result;
// };

export { fetchCollections };
