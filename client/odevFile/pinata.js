const axios = require("axios");
const pinataApiKey = "1097663ff44122b06ea5";
const pinataSecretApiKey =
  "ce395dfeb633471b905ef3a423f8a180a8602f7321d80cf05f951fe1d79650a9";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjODI4NGQyZS1mOTcxLTRjM2MtOGE4Ni0yYWNhYWViODc5NmIiLCJlbWFpbCI6ImFuZHkzNjM4QG5hdmVyLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMDk3NjYzZmY0NDEyMmIwNmVhNSIsInNjb3BlZEtleVNlY3JldCI6ImNlMzk1ZGZlYjYzMzQ3MWI5MDVlZjNhNDIzZjhhMTgwYTg2MDJmNzMyMWQ4MGNmMDVmOTUxZmUxZDc5NjUwYTkiLCJpYXQiOjE2NDgxMTgwNTB9.tW7rc8xkeGIvm2v-mWui9OJ78V1oOTmRng_MKLuhIWQ";

const url = `https://api.pinata.cloud/data/userPinnedDataTotal`;
// const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

await axios
  .get(url, {
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  })
  .then(function (response) {
    console.log(response);
    //handle response here
  })
  .catch(function (error) {
    //handle error here
  });

await axios
  .post(url, data, {
    maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  })
  .then(function (response) {
    console.log(response);
    //handle response here
  })
  .catch(function (error) {
    // console.log(error);
    //handle error here
  });
