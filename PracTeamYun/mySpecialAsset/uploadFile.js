const { YOURAPIKEY, YOURSECRETKEY } = require("./key.js");

const pinataApiKey = YOURAPIKEY;
const pinataSecretApiKey = YOURSECRETKEY;
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { cachedDataVersionTag } = require("v8");

const pinFileToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", fs.createReadStream("../image/Ithinkshelikesme.jpg"));
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  console.log(res.data);
};

pinFileToIPFS();
