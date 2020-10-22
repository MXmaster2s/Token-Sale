import React, { Component } from "react";

import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123... ", tokenSaleAddress: null, tokenAddress: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.myTokendeployedNetwork = MyToken.networks[this.networkId];
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        this.myTokendeployedNetwork && this.myTokendeployedNetwork.address,
      );

      this.networkId = await this.web3.eth.net.getId();
      this.myTokenSaledeployedNetwork = MyTokenSale.networks[this.networkId];
      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        this.myTokenSaledeployedNetwork && this.myTokenSaledeployedNetwork.address,
      );

      this.networkId = await this.web3.eth.net.getId();
      this.kycContractdeployedNetwork = KycContract.networks[this.networkId];
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        this.kycContractdeployedNetwork && this.kycContractdeployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true, tokenSaleAddress: this.myTokenSaledeployedNetwork.address, tokenAddress: this.myTokendeployedNetwork.address });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycWhitelisting = async() => {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for "+this.state.kycAddress+" is completed!");
  }
  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Ice Cream Token Sale!</h1>
        <p>Get your ICE Tokens Today!</p>
        <h2>KYC Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button name="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button>
        <h2>Buy ICE Tokens!</h2>
        <p>To get one ICE tokens, just send 0.00000000000001 ETH to this address: {this.state.tokenSaleAddress}</p>
        <h3>Add ICE Tokens in your Metamask!</h3>
        <p>Just place this token address in your Metamask: {this.state.tokenAddress}</p>
      </div>
    );
  }
}

export default App;
