import React from "react";

export default function AppContenido(props) {
  const { logo, ethWallet, balance, renderNetworkName, network } = props;
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
