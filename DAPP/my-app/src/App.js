import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import contract from "./ICO_Contract.json";
import Navbar from "./Navbar";
import "./App.css";
let rpcUrl = "https://ropsten.infura.io/v3/db6ad682b4aa4d88b6d4850823672e09";
const Account1 = "0x9803CC075d4520f8Ea76201893EE133DAeA55B47";
const Account2 = "0x4882dC0662DF0ee370BA97Cbb86a45ceD716E53F";
let web3 = new Web3(rpcUrl);
// let contract = require("./ICO_Contract.json");
let abi = contract.abi;
// console.log("hey ========", abi);
const contractAddress = "0x06Ba2ce7F269892EcA5A85403cA6a75E6B8351c5"; //presale contract address

const App = () => {
  let content;
  const [inputfieldchange, setinputfieldchange] = useState(0); // input field where we write our tokens amount
  const [account, setAccount] = useState(""); // here we set the account which is connected
  const [Hello, setHello] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setloading2] = useState(false);
  const [refresh, setrefresh] = useState(0);
  const [TokenName, setTokenName] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [decimals, setdecimals] = useState("");
  const [totalSupply, settotalSupply] = useState("");
  const [remainingPreSaleTokens, setremainingPreSaleTokens] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getStartTime, setStartTime] = useState("");
  const [getisSaleopen, setisSaleopen] = useState("");
  const [getEndTime, setEndTime] = useState("");
  const [getNOPH, setNOPH] = useState("");
  const [getBalance, setBalance] = useState("");
  const [presalecontractinstance, setpresalecontractinstance] = useState({});

  const loadWeb3 = async () => {
    // this function will open the metamask wallet
    //load metamask
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    // here we are going to load blockchain data
    setLoading(true); // set loading to true
    if (typeof window.ethereum === "undefined") {
      // if system doesnot find metamask then it will be undefined
      return;
    }
    web3 = new Web3(window.ethereum); // here we create the instance of web3

    const accounts = await web3.eth.getAccounts(); //get the accounts of metamask

    console.log(accounts[0]); // 1st address of metamask

    if (accounts.length === 0) {
      // if length of account is o then return null
      return;
    }
    setAccount(accounts[0]); //else set 1st account to the Accounts hook
    //   console.log("Account is : ", account);
    //  console.log(account, "==========");
    const networkId = await web3.eth.net.getId(); //gets network id in my case i use ganache and truffle so its id is 5777
    console.log("Netwrok id is : ", networkId);
    // window.alert(networkId)
    // const networkData = Helloabi.abi.networks[networkId];
    // console.log(networkData);
    if (networkId == 3) {
      // if network id is 5777 which is truffle/ganache id
      // 0x7FA24607EcB6Ca6F2009414ec6669BE34060F256 // address of token
      const contract = new web3.eth.Contract(abi, contractAddress); //abi of deployed contract and its address

      const TokenName = await contract.methods.GetTokenName().call(); //here we get token name
      console.log("TokenName is : ", TokenName); //show it on console
      setTokenName(TokenName); //then set its value to HooK

      const GetSymbol = await contract.methods.GetSymbol().call();
      console.log("Token Symbol is : ", GetSymbol);
      setTokenSymbol(GetSymbol);

      const decimalss = await contract.methods.decimalss().call();
      console.log("decimalss is : ", decimalss);
      setdecimals(decimalss);

      const TotalSupply = await contract.methods.OverAllTotalSupply().call();
      console.log("TotalSupply is : ", TotalSupply);
      settotalSupply(TotalSupply);

      const CheckingRemainingPresaleTokens = await contract.methods
        .CheckingRemainingPresaleTokens()
        .call();
      console.log(
        "Remaining Presale Tokens are : ",
        CheckingRemainingPresaleTokens
      );
      setremainingPreSaleTokens(CheckingRemainingPresaleTokens);

      const Price = await contract.methods.getPriceOFPresaleToken().call();
      const priceInEth = await web3.utils.fromWei(Price, "ether");
      console.log("Tokens price is : ", Price);
      console.log("Tokens price is : ", priceInEth);
      setPrice(priceInEth);

      const StartTime = await contract.methods.GetStartTimeofPresale().call();
      console.log("Start Time of Pre-sale is : ", StartTime);
      setStartTime(StartTime);

      let isSaleopen = await contract.methods.Sale().call();
      console.log("is Sale of presale open ? : ", isSaleopen);
      setisSaleopen(isSaleopen);

      const endTime = await contract.methods.GetEndingTime().call();
      console.log("End time of presale is : ", endTime);
      setEndTime(endTime);

      const noOPSH = await contract.methods.numberOfPresaleHolders().call();
      console.log("No Of Presale Holders : ", noOPSH);
      setNOPH(noOPSH);

      const balanceofuser = await contract.methods
        .balanceOf(accounts[0])
        .call();
      const balanceofuserinwei = await web3.utils.fromWei(
        balanceofuser,
        "ether"
      );
      setBalance(balanceofuserinwei);

      setLoading(false); //here we set loading to false to show content on screen
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const changeininputfield = (e) => {
    //it will call whenever data is entered in input field
    console.log(e.target.value);
    setinputfieldchange(e.target.value); // here we set the value while setting input field change
  };

  const onsubmit = async () => {
    // when button is clicked it call function which is
    console.log(parseInt(inputfieldchange)); //onsendbuytransaction and value comes from input field change
    if (parseInt(inputfieldchange) > 0) {
      await onsendbuytransaction(inputfieldchange); // finally here we call our main buy transaction function
    } else {
      window.alert("null value not allowed");
    }
  };

  const onsendbuytransaction = async (i) => {
    // while calling this function user enter the amount of tokens he want
    // amount of tokens
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(abi, contractAddress);

    const amountofethinwei = i + "";

    await contract.methods
      .BuyTokens(i) //here we call our smart contract function which is BuyTokens
      .send({ from: account, value: amountofethinwei }) // here we wrap it and send transaction from account who
      .once("recepient", (recepient) => {
        //call it and value how much amount they
        window.alert("sucess");
      })
      .on("error", () => {
        window.alert("error ");
      });
    // await Hello.methods.setCompleted(a.toString()).send({ from: account }).once("recepient", (recepient) => {
    //     console.log("success");
    //   })
    // .on("error", () => {
    //   console.log("error");
    // });
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      //get wallet address
      method: "eth_requestAccounts",
      params: [{ eth_accounts: {} }],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh === 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div className="main_container">
        <main role="main" className="container">
          <div className="jumbotron">
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token name is : {TokenName}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token symble is : {TokenSymbol}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token decimals is : {decimals}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>TotalSupply is : {totalSupply}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Remaining-PreSale-Tokens are : {remainingPreSaleTokens}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Price of Presale token 100 tokens per {getPrice} Ether</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Start Time of Presale is : {getStartTime}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>End Time of Presale is : {getEndTime}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Remaining-PreSale-Tokens are : {remainingPreSaleTokens}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Is Presale open ? : {getisSaleopen}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>No Of Presale Holders are : {getNOPH}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3> Balance is : {getBalance}</h3>
              </div>
              <div className="row55" style={{ paddingLeft: "40px" }}>
                <input
                  className="input_field"
                  placeholder="input amount of tokens"
                  value={inputfieldchange}
                  onChange={changeininputfield}
                />

                <div className="row" style={{ paddingLeft: "40px" }}>
                  <button className="button2" onClick={onsubmit}>
                    Buy PHOINIX Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} />

      {account === "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button className="button1" onClick={onsubmit}>
            metamask
          </button>
        </div>
      ) : (
        content
      )}
      {/* {{ content }} */}
    </div>
  );
};

export default App;
