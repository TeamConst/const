
  
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

uint256 constant TOTAL_TICKETS = 3;

contract Tickets {
  address public owner = msg.sender;

  struct Ticket {
    uint256 price;
    address owner;
    uint256 endTime;
  }

  Ticket[TOTAL_TICKETS] public tickets;

  constructor() {
    for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
      tickets[i].price = 1e17*(i+1); // 0.1 ETH
      tickets[i].endTime = block.timestamp + ((i+1)* 1 days);
    }
  }

  function buyTicket(uint256 _index) external payable {
    require(_index < TOTAL_TICKETS && _index >= 0);
    require(msg.value >= tickets[_index].price);
    tickets[_index].owner = msg.sender;
  }
}