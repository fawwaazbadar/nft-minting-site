import { useState, useEffect } from "react";
import "./App.css";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import nftVideo from "./assets/nftvideo.mp4";

import backgroundVideo from "./assets/background.mp4";
import { ethers } from "ethers";
import abi from "./contracts/contract.json";


function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [hash, setHash] = useState();
  const [totalSupply, setTotalSupply] = useState();

  // CREATE A USE STATE CALLED ACCOUNT

  const mint = async () => {
    console.log('MINT START');

    const transaction = await contract.safeMint(1, {
      value: ethers.utils.parseUnits('0.01', 'ether'),
    });
    console.log(transaction); 
    setInProgress(true); 
    setHash(transaction.hash);
    
    await transaction.wait(3);
    setInProgress(false);
    setCompleted(true);
    

  };

  const getTotalSupply = async () => {
    const totalSupply = await contract.totalSupply();
    setTotalSupply(totalSupply.toNumber());
  };

  useEffect(()=>{
    if(contract) {
      getTotalSupply();
    }

  }, [contract])

  const logout = () => {
    setAccount(null);
  }

  const login = async () => {
    console.log("button is clicked");
    try {
      
      let accounts = await window.ethereum.enable();
      console.log(accounts);
      setAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const address = "0x126E7Ea31e065be13F93655B58B057C21A367CC2";
      const contract = new ethers.Contract(address, abi, signer);
      setContract(contract);
      console.log(contract);
    } catch (error) {
      console.error(error);
    }
    
  };

  const getState = () => {
    if (inProgress) {
      return <InProgressMinting hash={hash}/>;
    }

    if (completed) {
      return <CompletedMinting />;
    }

    return <StartMinting logout={logout} mint={mint} />;
  };

  return <div className="App">

<video className="bgvideo" autoPlay muted loop>
                <source src={backgroundVideo} type="video/mp4" />
                
              </video>
  <div className="card">
      <div className="hero">
          <div className="nft-video">
              <video width="400" height="400" autoPlay muted loop>
                <source src={nftVideo} type="video/mp4" />
              
              </video>
          </div>
          <div className="nft-info">
            <h2>Adidos: INTO THE METAVERSE</h2>
            <div>{totalSupply} / 3000 minted</div>
            { account 
                  ? getState()
                  :  <div className="actions">
                      <div onClick={login} className="button">CONNECT WALLET</div>
                      <div className="button">LEARN MORE</div>
                    </div>
                }
          </div>
      </div>
      <div className="footer">
        MINTING NOW
      </div>
  </div>
</div>
}

export default App;
