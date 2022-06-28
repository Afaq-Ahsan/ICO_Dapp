const { max } = require("bn.js");
const Web3 = require("web3");
const rpcUrl = "HTTP://127.0.0.1:7545";
const web3 = new Web3(rpcUrl);

// const Account1 = "0xa8c72731a10149FDc8e97498bcB141667BeF443c";
//const Account2 = "0x942Cd56D2A82E8e9D08aaB0E59463f3EB00f7C23";

const abi = require("./abi");
const contractAddress = "0x04fE75b8dCFe7A58398E4785705f15Cfc9193Ed7";

const contractRead = async () => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);

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
    console.log("error while contract read :", e);
  }
};
contractRead();
