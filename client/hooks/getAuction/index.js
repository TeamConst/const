import axios from "axios";

const fetchContract = async () => {
  const data = await axios.get("http://54.227.126.254:8080/api/getContract");
  return data;
};

export { fetchContract };
