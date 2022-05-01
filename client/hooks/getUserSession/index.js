import axios from "axios";

const fetchUserSession = async () => {
  const data = await axios.get("http://54.227.126.254:8080/api/getUserSession");
  return data;
};

export { fetchUserSession };
