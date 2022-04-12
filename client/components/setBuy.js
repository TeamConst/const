import { useQuery } from "react-query";
import { useForm } from "react-hook-form";

import web3 from "./connection/web3";
import collectionContractJSON from "../../build/contracts/NFTCollection.json";
import marketContractJSON from "../../build/contracts/NFTMarketplace.json";

const SetBuy = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // 컨트랙트
    // buy contract
    let pra;
    let praaccounts;
    const accounts1 = await web3.eth.getAccounts();
    const networkId1 = await web3.eth.net.getId();
    const deployedAddress1 =
      collectionContractJSON.networks[networkId1].address;
    const contract1 = new web3.eth.Contract(
      collectionContractJSON.abi,
      deployedAddress1
    );

    pra = contract1;
    praaccounts = accounts1;

    let pra1;
    const deployedAddress2 = marketContractJSON.networks[networkId1].address;
    const contract2 = new web3.eth.Contract(
      marketContractJSON.abi,
      deployedAddress2
    );
    pra2 = contract2;

    // 오퍼
    const priceRefs = useRef([]);
    if (priceRefs.current.length !== collectionCtx.collection.length) {
      priceRefs.current = Array(collectionCtx.collection.length)
        .fill()
        .map((_, i) => priceRefs.current[i] || createRef());
    }

    const enteredPrice = web3.utils.toWei(
      priceRefs.current[key].current.value,
      "ether"
    );

    pra.methods
      .approve(pra2.options.address, id)
      .send({ from: praaccounts[0] })
      .on("transactionHash", (hash) => {
        console.log("해시해시", hash);
      })
      .on("receipt", (receipt) => {
        pra2.methods
          .makeOffer(id, enteredPrice)
          .send({ from: praaccounts[0] })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
          });
      });

    // 바이

    // 캔슬
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>뭐 넣어놔</form>
    </div>
  );
};

export default SetBuy;
