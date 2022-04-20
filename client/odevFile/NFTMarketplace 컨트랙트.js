// 컨트랙트 불러오기
let pra;
let praaccounts;
const accounts = await web3.eth.getAccounts();
const networkId = await web3.eth.net.getId();
const deployedAddress = contractJSON.networks[networkId].address;
const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress);

pra = contract;
praaccounts = accounts;

// 그지 어떤 data 넣을지 생각을 해야지

// 컨트랙트 처리
const reader = new window.FileReader();
// reader.readAsArrayBuffer(data);
const capturedFileBuffer = Buffer(JSON.stringify(data));
pra.methods
  .safeMint(metadataAdded.path)
  .send({ from: praaccounts[0] })
  .on("transactionHash", (hash) => {
    console.log(hash);
    // pra.setNftIsLoading(true);
  })
  .on("error", (e) => {
    window.alert("Something went wrong when pushing to the blockchain");
    // pra.setNftIsLoading(false);
  });

// ipfs 처리
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const fileAdded = await ipfs.add(capturedFileBuffer);
if (!fileAdded) {
  console.error("Something went wrong when updloading the file");
  return;
}

const metadata = {
  title: "Asset Metadata",
  type: "object",
  properties: {
    name: {
      type: "string",
      // description: enteredName,
    },
    description: {
      type: "string",
      // description: enteredDescription,
    },
    image: {
      type: "string",
      description: fileAdded.path,
    },
  },
};

const metadataAdded = await ipfs.add(JSON.stringify(metadata));
if (!metadataAdded) {
  console.error("Something went wrong when updloading the file");
  return;
}
