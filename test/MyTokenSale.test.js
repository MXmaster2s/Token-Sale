const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({path: "../.env"});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Sale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in deployerAccount", async() => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

});
