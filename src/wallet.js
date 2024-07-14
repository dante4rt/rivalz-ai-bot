const { Wallet, Contract } = require('ethers');
const { RIVALZ_ABI } = require('./abi');

function createWallet(privateKey, provider) {
  return new Wallet(privateKey, provider);
}

function createContract(wallet, contractAddress) {
  return new Contract(contractAddress, RIVALZ_ABI, wallet);
}

module.exports = {
  createWallet,
  createContract,
};
