import React from "react";

const CompletedMinting = () => {
  const url = "https://testnets.opensea.io/collection/web3builders-3ugxvegaft";

  const viewOpenSea = () => {
    // Open a url in goerli with yor hash
    window.open(url, "_blank");
  };

  return (
    <div>
      <div>All set! You NFT has been minted.</div>
      <div onClick={viewOpenSea} className="button">
        VIEW OPENSEA
      </div>
    </div>
  );
};

export default CompletedMinting;
