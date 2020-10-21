const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

require("dotenv").config({path: "../.env"});

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Sale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in deployerAccount", async() => {
        let instance = await MyToken.deployed();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the MyTokenSale SC by default", async() => {
        let instance = await MyToken.deployed();
        let balanceOfTokenSale = await instance.balanceOf(MyTokenSale.address);
        let totalSupply = await instance.totalSupply();
        expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy tokens", async() => {
        //deploying MyToken and MyTokenSale SC
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        //Store balance of deployer account before transaction
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        expect(tokenSaleInstance.sendTransaction({
            from: deployerAccount,
            value: web3.utils.toWei("1", "wei")
        })).to.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });
});
