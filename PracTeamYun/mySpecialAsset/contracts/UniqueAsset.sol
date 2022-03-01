// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract UniqueAsset is ERC721URIStorage{
    //Counters to help us increment the identifiers for the tokens we mint.
    // 카운터 라이브러리(갯수세는역할함)를 쓴다. 이 유형으로
  using Counters for Counters.Counter;
    //변수만듦to keep track of all of the tokens we’ve issued.
  Counters.Counter private _tokenIds;
    //mapping for the IPFS hashes associated with tokens. 
  mapping(string => uint8) hashes;

   constructor() ERC721("UniqueAsset", "UNA") {}


// 특정IPFS해시에 아직 mint안되어있으면 mint하는 함수
// a method to our contract that will allow us to mint an NFT for a specific IPFS hash if not token has been minted yet for that hash
                           //nft수령인//NFT를 생성할 콘텐츠와 관련된 IPFS 해시 //자산에 대한 JSON 메타데이터에 대한 링크를 참조해야 한다
function awardItem(address recipient, string memory hash, string memory metadata) public returns (uint256)
{

  require(hashes[hash] != 1);
  hashes[hash] = 1;
  _tokenIds.increment();
  uint256 newItemId = _tokenIds.current();
  _mint(recipient, newItemId);
  _setTokenURI(newItemId, metadata);
  return newItemId;
}
}