const Web3 = require("web3"); //import web3
const rpcUrl = "HTTP://127.0.0.1:7545"; //get connected with ganache url
const web3 = new Web3(rpcUrl);

const abi = require("./abi"); //get the abi file of the contract

const contractAddress = "0xdF047ce481B4819609eda4339f62cC0BaFfC6233"; // contract address which is deployed
const TRX = require("@ethereumjs/tx"); // import ethereumjs/tx for making transactions
const TX = TRX.Transaction;

const Account1 = "0xa8c72731a10149FDc8e97498bcB141667BeF443c";
const Account2 = "0x942Cd56D2A82E8e9D08aaB0E59463f3EB00f7C23"; //Account2 from where we buy it
const ERC20_Contract_Address = "0x11D07596Af4602DC4104bA36Ae84e50Fd36Ab77f";

const PrivateKey =
  "0558932639ff5259d87169385204ff0cb7c8db2f1d92676fe2846cb9e222ca10"; //private key of account 1

const Private_Key = Buffer.from(PrivateKey, "hex"); // convert private key into bytes

const contract = new web3.eth.Contract(abi, contractAddress); // set abi and contract address in a varibale called contract

const write = async () => {
  // here we start making function

  try {
    // try catch block

    let TXCount = await web3.eth.getTransactionCount(Account1); //  returning the amount of mined transactions sent from the specified address.
    const txObj = {
      nonce: web3.utils.toHex(TXCount), //what is the current nonce
      to: contractAddress, //where we want to send transaction
      //how much value we want to send in ether first convert to wei and then in to hex
      data: contract.methods.Setup_Address(ERC20_Contract_Address).encodeABI(), //here we cal our one of function which is in our contract buyNFTs()
      gasLimit: web3.utils.toHex(6721975), // set our gas limit
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")), //gas price is sets here
    };

    //If we want to buy tokens
    // let TXCount = await web3.eth.getTransactionCount(Account1);
    // const txObj = {
    //   nonce: web3.utils.toHex(TXCount), //what is the current nonce
    //   to: contractAddress, //where we want to send transaction
    //   value: web3.utils.toHex(web3.utils.toWei("21", "wei")), //how much value we want to send in ether first convert to wei and then in to hex
    //   data: contract.methods.BuyTokens("21").encodeABI(), //here we cal our one of function which is in our contract buyNFTs()
    //   gasLimit: web3.utils.toHex(6721975), // set our gas limit
    //   gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")), //gas price is sets here
    // };

    const tx = new TX(txObj);
    const SignedTransaction = tx.sign(Private_Key); //sign our transaction with private key

    console.log("before serialize: ", SignedTransaction); // just for checking

    const serializedTX = SignedTransaction.serialize(); //convert out transaction to serialize

    console.log("after serialize: ", serializedTX); // just for checking

    const raw = "0x" + serializedTX.toString("hex"); //concatenate

    const sendSignedTransaction = await web3.eth.sendSignedTransaction(raw); // here we execute our transaction

    console.log("Transaction is completed", sendSignedTransaction);

    //here we are going to read contract

    const TokenName = await contract.methods.GetTokenName().call();
    console.log("TokenName is : ", TokenName);

    const GetSymbol = await contract.methods.GetSymbol().call();
    console.log("Token Symbol is : ", GetSymbol);

    const decimalss = await contract.methods.decimalss().call();
    console.log("decimalss is : ", decimalss);

    const TotalSupply = await contract.methods.OverAllTotalSupply().call();
    console.log("TotalSupply is : ", TotalSupply);

    const CheckingRemainingPresaleTokens = await contract.methods
      .CheckingRemainingPresaleTokens()
      .call();
    console.log(
      "Remaining Presale Tokens are : ",
      CheckingRemainingPresaleTokens
    );

    const getPriceOFPresaleToken = await contract.methods
      .getPriceOFPresaleToken()
      .call();
    console.log("Get-Price-OF-Presale-Token is : ", getPriceOFPresaleToken);

    const GetStartTimeofPresale = await contract.methods
      .GetStartTimeofPresale()
      .call();
    console.log("start time of presale is : ", GetStartTimeofPresale);

    const Sale = await contract.methods.Sale().call();
    console.log("is Sale open : ", Sale);

    const GetEndingTime = await contract.methods.GetEndingTime().call();
    console.log("Get End time of presale : ", GetEndingTime);
  } catch (e) {
    console.log("ERROR is :", e);
  }
};
write();
