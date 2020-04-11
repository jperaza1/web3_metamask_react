import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/img/logo.svg";
import NotMetamask from "./components/NotMetamask";
import Web3 from "web3";

function App() {
  const [isMetamask, setIsMetamask] = useState(null);
  const [ethWallet, setEthWallet] = useState(null);
  const [network, setNetwork] = useState(null);
  const [networkChange, setNetworkChange] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (networkChange) {
      getAccountMetamask();
    } else {
      if (typeof window.ethereum !== "undefined") {
        setIsMetamask(true);
        getAccountMetamask();
      } else {
        setIsMetamask(false);
      }
    }
  }, [networkChange]);

  if (!isMetamask) {
    return <NotMetamask />;
  }

  window.ethereum.on("networkChanged", (account) => {
    setNetworkChange(true);
  });

  function renderNetworkName(netWorkId) {
    switch (netWorkId) {
      case "1":
        return "Main";
      case "2":
        return "Morden";

      case "3":
        return "Ropsten";

      case "4":
        return "Rinkeby";

      case "42":
        return "Kovan";

      default:
        return "Unknown";
    }
  }

  async function getAccountMetamask() {
    const accounts = await window.ethereum.enable();
    const provider = window["ethereum"];
    const web3 = new Web3(Web3.givenProvider);
    const account = accounts[0];
    setEthWallet(account);
    setNetwork(provider.networkVersion);
    console.log(provider);
    web3.eth.getBalance(account).then((result) => {
      const balance = web3.utils.fromWei(result, "ether");
      setBalance(balance);
    });
  }

  return (
    <div className="App">
      <div className="text-center">
        <h1>Balance ETH</h1>
        <img src={logo} alt="logo" width="50%" />
        {ethWallet === null && (
          <>
            <h3>usaremos tu direccion de wallet para identificarte!</h3>
          </>
        )}
      </div>
      <div>
        {ethWallet !== null && (
          <>
            <p>
              <strong>Wallet: </strong>
              {ethWallet}
            </p>
            <h1>{balance} ETH</h1>
            <h3>Red: {renderNetworkName(network)}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
