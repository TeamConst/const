import { useQuery } from "react-query";
import { fetchOffer } from "../hooks";
import { useEffect } from "react";
import web3 from "./connection/web3";

const GetOffer = () => {
  useEffect(() => {
    console.log("1");

    async function A() {
      let ImageNFTMarketplace = require("../../build/contracts/ImageMarketplace.json");

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      let deployedNetwork = ImageNFTMarketplace.networks[networkId];

      let NFTMarketplaceInstance = new web3.eth.Contract(
        ImageNFTMarketplace.abi,
        deployedNetwork.address
      );

      if (NFTMarketplaceInstance) {
        const ImageCount = await NFTMarketplaceInstance.methods
          .currentImageCount()
          .call();

        console.log(ImageCount);
        // for (let i = 1; i <= ImageCount; i++) {
        //   let image = await NFTMarketplaceInstance.methods
        //     .imageStorage(i)
        //     .call();
        //   console.log(image);
        //   console.log(image.mintedBy);
        //   setImages((Images) => [...Images, image]);
        //   setImagesId(image.currentOwner);
        //   console.log(...Images, image[3]);
        //   let auction = await NFTMarketplaceInstance.methods.auctions(i).call();
        //   setAuctions((Auctions) => [...Auctions, auction]);

        //   console.log(auction.endTime);
        // }
        // let ImageNumOfAccount = await NFTMarketplaceInstance.methods
        //   .getOwnedNumber(accounts[0])
        //   .call();
        // setContract(NFTMarketplaceInstance);
        // setAccountAddress(accounts[0]);
        // setAccountBalance(balance);
        // setImageCount(ImageCount);
        // setImageNumOfAccount(ImageNumOfAccount);
      }
    }

    A();
  }, []);

  // const { data, isLoading, isFetching } = useQuery(["getOffer"], () =>
  //   fetchOffer()
  // );

  // console.log(data);

  return <div>1</div>;
};

export default GetOffer;
