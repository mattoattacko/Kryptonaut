// hardhat-waffle is just a plugin to build smart contract tests

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/8MizDj5RA7s3eqvyIXn8v8KUALdEsotU',
      accounts: ['b6742e41cd28197e43bf9eed37e8c05a116a23f0635b559aa0e3e7497466605f']
    }
  }
}