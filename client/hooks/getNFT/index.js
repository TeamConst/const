import axios from "axios";

const fetchNFT = async () => {
  const newDate = new Date();
  console.log(newDate);
  const data = await axios.get("http://localhost:8080/api/getNFT");

  return data;
};

export { fetchNFT };
