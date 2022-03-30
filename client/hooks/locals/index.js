import ky from "ky-universal";
import { useQuery } from "react-query";
import axios from "axios";

const fetchLocals = async () => {
  // const parsed = await ky("http://localhost:3000/api/locals").json();
  const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();

  // const result = parsed.filter((x) => x.id <= limit);
  // console.log(result);
  // return result;
  return parsed;
};

// const fetchLocals = async (limit = 10) => {
//   const parsed = await ky("https://jsonplaceholder.typicode.com/posts").json();
//   const result = parsed.filter((x) => x.id <= limit);

//   console.log(result);
//   return result;
// };

export { fetchLocals };
