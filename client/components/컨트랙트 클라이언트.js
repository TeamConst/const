// 여기 부분은 사실 민트 하는 페이지에서는 필요 없지
// 일단 정리 해놓고 이제 다른 컴포넌트로 옮기자
if (NFTMarketplaceInstance) {
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
} else throw "스마트 연락처에 연결하지 못했습니다.";
