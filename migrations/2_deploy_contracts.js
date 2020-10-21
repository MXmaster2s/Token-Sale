var MyToken = artifacts.require("./MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");

module.exports = async function(deployer) {
  let address = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, 100000);
  await deployer.deploy(MyTokenSale, 1, address[0], MyToken.address);
  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, 100000);
};
