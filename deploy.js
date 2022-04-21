const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
  // This seed phrase is from a test wallet.
  // Use environment variables when using a real wallet.
  'bachelor elder stairs salon duck follow disease local kid tube strike code',
  'https://rinkeby.infura.io/v3/cbe42a9daef64613bff25927292e1666'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from accounts', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  //To prevent a hanging deployment.
  provider.engine.stop();
};

deploy();
