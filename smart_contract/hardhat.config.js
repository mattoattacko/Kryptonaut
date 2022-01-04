// hardhat-waffle is just a plugin to build smart contract tests
// This page interacts with 'scripts/deploy.js' and 'contracts/Transaction.sol'

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0', //version
  networks: { //network we want it to work on
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/8MizDj5RA7s3eqvyIXn8v8KUALdEsotU', //url is from Alchemy
      accounts: ['b6742e41cd28197e43bf9eed37e8c05a116a23f0635b559aa0e3e7497466605f'] //the address of the account that we use to fund (gas) the contract
    }
  }
}