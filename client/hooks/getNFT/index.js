import axios from "axios";

const fetchNFT = async () => {
  const newDate = new Date();
  console.log("페치nft 새로고침 확인", newDate);

  const data = await axios.get("http://13.209.65.10:8080/api/getNFT");
  return data;
};

export { fetchNFT };
