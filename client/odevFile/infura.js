// ipfs-http-client 라이브러리 사용안하고 연결해도 됨. docs 참고

const ipfsClient = require("ipfs-http-client");

// 개인 id, secret
const projectId = "26fkdqdZ9VBjWP310ZLH3ZUkb5T";
const projectSecret = "9c05a2839dd121251b98ed30be561824";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// add 예시 api는 docs 참고
client.pin.add("QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn").then((res) => {
  console.log(res);
});
