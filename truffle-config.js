const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = '96bff97dc2dc424e84752907bacfc32e';
//
// const fs = require('fs');
const mnemonic =
  'dentist ready lunar awake tiny traffic unlock multiply guide lawsuit noise style';
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      port: 8545,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        ),
      network_id: 4, // rinkeby's id
      gas: 4500000, // rinkeby has a lower block limit than mainnet
      gasPrice: 10000000000,
    },
  },
};
