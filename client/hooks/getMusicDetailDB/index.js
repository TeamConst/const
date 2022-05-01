import axios from "axios";

const fetchMusicDetailDB = async (param) => {
  console.log("이거는?", param);
  const data = await axios.post("http://localhost:8080/api/getMusicDetailDB", {
    CID: param,
  });
  return data;
};

export { fetchMusicDetailDB };
