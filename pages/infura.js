// ipfs-http-client 라이브러리 사용안하고 연결해도 됨. docs 참고

const ipfsClient = require("ipfs-http-client");
const ipfs = require("ipfs");
const axios = require("axios");
const request = require("request");

// 개인 id, secret
const projectId = "26JSf6I81Is4SOpvhZSmlB6sA8d";
const projectSecret = "dca17087fc6cff1fa1d06f45ce9c448c";
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

client.add("hi");
// client.add(ipfs.globSource("./docs", "**/*"));
// client.addAll(ipfs.globSource("./docs", "**/*"));
// for (const file of client.addAll(ipfs.globSource("./docs", "**/*"))) {
//   console.log(file);
// }
/*
  {
    path: 'docs/assets/anchor.js',
    cid: CID('QmVHxRocoWgUChLEvfEyDuuD6qJ4PhdDL2dTLcpUy3dSC2'),
    size: 15347
  }
  {
    path: 'docs/assets/bass-addons.css',
    cid: CID('QmPiLWKd6yseMWDTgHegb8T7wVS7zWGYgyvfj7dGNt2viQ'),
    size: 232
  }
  ...
  */

// add 예시 api는 docs 참고
// client.pin.add("QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn").then((res) => {
//   console.log(res);
// });

// client.add(ipfsClient.urlSource("https://ipfs.io/images/ipfs-logo.svg"));
// const options1 = {
//   host: "ipfs.infura.io",
//   port: 5001,
//   path: "/api/v0/add?pin=false",
//   method: "POST",
//   auth: projectId + ":" + projectSecret,
// };

// var headers = {
//   "Content-Type": "application/json",
// };

// var dataString =
//   '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';

// var options = {
//   url: options1,
//   method: "POST",
//   headers: headers,
//   body: dataString,
// };

// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     json = response.body;
//     var obj = JSON.parse(json);
//     hex = obj.result.number;
//     final = parseInt(hex, 16);
//     console.log(final);
//   }
// }

// request(options1, callback);
