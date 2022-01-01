const main = async() => {

  const Transactions = await hre.ethers.getContractFactory("Transactions"); // like a call that generates instances of that specific contract
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address); // running this script our transactions will be deployed, and then we get teh address of our smart contract deployed on the blockchain network
}

const runMain = async() => {
  try {
    await main(); // this is where we deploy our contract
    process.exit(0); // means the process went OK
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain(); // this is the first line that is executed. It calls the 'runMain()' function which calls our main function which is responsible for deploying the contract.