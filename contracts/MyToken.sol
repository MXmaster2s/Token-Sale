pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Ice Cream Tokens", "ICT") {
        _mint(msg.sender, initialSupply);
    }
}
