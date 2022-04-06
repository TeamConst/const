import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchNFT } from "../hooks";
import web3 from "./connection/web3";

const GetNFT = () => {
  //  react-query http
  const { data, isLoading, isFetching } = useQuery(["getNFT"], () =>
    fetchNFT()
  );

  let images;
  let a = 0;
  if (data) {
    images = data.data;
    a = 1;
  }

  console.log("fetch");
  console.log(data);
  //   react-query websocket

  //  클라이언트에서 그대로 불러오기
  const [이미지, 이미지변경] = useState([]);
  //   이미지변경(getImage());
  //   console.log(이미지);
  //   console.log("hi");
  //   useEffect(() => {
  //     const abc = setupBlockchain();
  //     console.log(abc);
  //   }, []);

  return (
    <div>
      {a === 1 ? images.map((a) => <div>{a.tokenURI}</div>) : <h1>아님</h1>}
    </div>
  );
  //   return <div>11</div>;
};

const getImage = async () => {
  const Instance = await setupBlockchain();

  if (Instance) {
    // 클라이언트 변수 처리 부분
    const [accountAddress, setAccountAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const [Contract, setContract] = useState(null);
    const [ImageCount, setImageCount] = useState(0);
    const [Images, setImages] = useState([]);
    const [ImageNumOfAccount, setImageNumOfAccount] = useState(0);
    const [Auctions, setAuctions] = useState([]);
    // 얜 뭐 경매 시각 쓰려고 한건가
    const [lastMintTime, setLastMintTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    const ContractImageCount = await NFTMarketplaceInstance.methods
      .currentImageCount()
      .call();
    for (let i = 1; i <= ContractImageCount; i++) {
      let image = await NFTMarketplaceInstance.methods.imageStorage(i).call();
      setImages((Images) => [...Images, image]);
      let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
      setAuctions((Auctions) => [...Auctions, auction]);
      setAuctions((Auctions) => [...Auctions, auction]);
      console.log("Auctions", Auctions);
      console.log("Auctions", auction);
    }
    let ContractImageNumOfAccount = await NFTMarketplaceInstance.methods
      .getOwnedNumber(accounts[0])
      .call();
    setContract(NFTMarketplaceInstance);
    setAccountAddress(accounts[0]);
    setAccountBalance(balance);
    setImageCount(ImageCount);
    setImageNumOfAccount(ContractImageNumOfAccount);
  }
};

const setupBlockchain = async () => {
  try {
    // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);

    // Get the contract instance.
    let balance =
      accounts.length > 0
        ? await web3.eth.getBalance(accounts[0])
        : await web3.utils.toWei("0");
    balance = await web3.utils.fromWei(balance, "ether");
    console.log("balance", balance);

    const networkId = await web3.eth.net.getId();
    console.log("networkId", networkId);

    const deployedAddress = ImageNFTMarketplace.networks[networkId].address;
    const NFTMarketplaceInstance = new web3.eth.Contract(
      ImageNFTMarketplace.abi,
      deployedAddress
    );
    console.log("NFTMarketplaceInstance", NFTMarketplaceInstance);

    return NFTMarketplaceInstance;
  } catch (error) {
    // 위의 작업에 대한 오류를 포착합니다.
    alert(
      "web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하세요."
    );
    console.error(error);
  }
};

export default GetNFT;
