import React, { Component } from 'react';
// import SuppyChainContract from './contracts/SimpleStorage.json';
import SuppyChainContract from './contracts/SupplyChain.json';
import getWeb3 from './getWeb3';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SuppyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SuppyChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(1).send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // let bool = await contract.methods.isFarmer(accounts[0]).call();
    // console.log(bool, 24);
    // await contract.methods
    //   .harvestItem(
    //     25,
    //     '0x4a2a8451db883314f0195A3E42b0b17124f97d5D',
    //     'Ramesh Kumar 25',
    //     'From ogigin info is coming soon 2',
    //     'latitude 123.34 2',
    //     'longitude 24.24 2',
    //     'product notes is here 2'
    //   )
    //   .send({ from: accounts[0] });
    let res = await contract.methods.fetchItemBufferOne(26).call();
    console.log(res, 24);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className='App'>
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <button>click me</button>
      </div>
    );
  }
}

export default App;
