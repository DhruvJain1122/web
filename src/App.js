import logo from './logo.svg';
import './App.css';
import React, {Component,componentDidMount} from 'react';
import web3 from './web3';
import source from './source';
// import LoadingOverlay from 'react-loading-overlay';


import destination from './destination';
const arbitrum_id = '0x66EEB';
const arbitrum_url = 'https://rinkeby.arbitrum.io/rpc';
const optimism_id = '0x45';
const optimism_url = 'https://kovan.optimism.io';
class App extends Component{
  state = {
    amount : 0,
    address : '',
    loading : false,
    current_chain : arbitrum_id,
    source_transactions : [],
    destination_transactions : [],
    current_page : "home"
  }
   changeToSource = async (event) =>{
    this.setState({current_chain:arbitrum_id});
    try{
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: arbitrum_id }], // chainId must be in hexadecimal numbers
      });
    this.setState({current_page:"source"});
    const source_trans = await source.methods.getTransactions().call();
   this.setState({source_transactions:source_trans});
    }catch(err){

    }
   }
   changeToHome = async (event) =>{
    this.setState({current_page:"home"});
   }
   changeToDestination = async (event) =>{

    this.setState({current_chain:optimism_id});
    try{
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: optimism_id }], // chainId must be in hexadecimal numbers
      });
    this.setState({current_page:"bounty"});
    const dest_trans = await destination.methods.getTransactions().call();
   this.setState({destination_transactions:dest_trans});
    }catch(err){

    }
   }
  async componentDidMount(){
    const source_trans = await source.methods.getTransactions().call();
   this.setState({source_transactions:source_trans});
   const destination_trans = await destination.methods.getTransactions().call();
   this.setState({destination_transactions:destination_trans});

    console.log(source_trans);
  }
 onNewTransfer = async (event) => {
   this.setState({current_chain:arbitrum_id});
  //  await this.checkNetwork();
  try{
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: arbitrum_id }], // chainId must be in hexadecimal numbers
    });
    const accounts = await web3.eth.getAccounts();
   console.log(accounts[0]);
    const fees = web3.utils.toWei( '0.001','ether');
   this.setState({loading:true});
   const ans = await source.methods.newTransaction(this.state.address,fees).send({
     from :  accounts[0],
     value : parseFloat(web3.utils.toWei( this.state.amount,'ether')) + parseFloat(fees)
   });
   this.setState({loading:false});

   console.log(ans);
  }catch(error){
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: this.state.current_chain,
              rpcUrl: arbitrum_url,
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
  }
}
   

 }
 async changeChain(){
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: this.state.current_chain }], // chainId must be in hexadecimal numbers
  });
 }
 onBuyReciept = async (details) => {
  this.setState({current_chain:optimism_id});
  //  await this.checkNetwork();
  try{
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: optimism_id }], // chainId must be in hexadecimal numbers
    });
    const accounts = await web3.eth.getAccounts();
   console.log(details[1]);

  //  this.setState({loading:true});
   const ans = await destination.methods.completeTransfer(details[0],details[1], details[2],details[5],this.state.address).send({
     from :  accounts[0],
     value :  details.amount
   });
   this.setState({loading:false});
   console.log("buying")
   console.log(ans);
  }catch(error){
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: this.state.current_chain,
              rpcUrl: arbitrum_url,
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
  }
}
 }



 onTransferWithdrawl = async (details) => {
  this.setState({current_chain:arbitrum_id});
  //  await this.checkNetwork();
  try{
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: arbitrum_id }], // chainId must be in hexadecimal numbers
    });
    const accounts = await web3.eth.getAccounts();
   console.log(accounts[0]);

  //  this.setState({loading:true});
   const ans = await source.methods.transferToTrader(details.destination,details.amount,details.transferId).send({
     from :  accounts[0],
   });
   this.setState({loading:false});

   console.log(ans);
  }catch(error){
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: this.state.current_chain,
              rpcUrl: arbitrum_url,
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
  }
}
 }

 checkNetwork = async ()=>{
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.state.current_chain }], // chainId must be in hexadecimal numbers
      });
      // await window.ethereum.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: optimism_id }], // chainId must be in hexadecimal numbers
      // });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: this.state.current_chain,
                rpcUrl: arbitrum_url,
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  } 
 }


  render(){
    return (
      
  //     <LoadingOverlay
  // active={this.state.loading}
  // spinner
  // text='Loading your content...'
  // >
      <div className="App">
          <div class="text-2xl text-white py-5 gap-2">
          <button onClick={
              this.changeToHome
            }>Home</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={
              this.changeToSource
            }>Bounty</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;

            
            <button onClick={
              this.changeToDestination
            }>Withdraw</button>
           
            
          </div>

        <header className="App-header">
        <div class="content-center">
          {(() => {
            if (this.state.current_page == "home") {
              return (
                <div class="relative flex w-full flex-wrap grid grid-row-3 space-y-4">
          
          <div class="row-span-1 ">0.001 Ether(Fees)</div>
      <div class="row-span-1">+</div>
          <div class="row-span-1 flex-wrap grid-cols-2 gap-2">
    
        {this.state.message}
      <input value={this.state.amount} onChange={e => this.setState({amount : e.target.value})}  type="number" placeholder="Ether (Arbitrum)" class="h-50 w-50 px-3 py-3 text-2xl placeholder-blueGray-300 text-black relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring  pr-10"/>
      <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
      </span>
      </div>
      <b></b>
        <center>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" fill="white"/></svg>
    
        </center>
    <input value={this.state.address} onChange={e => this.setState({address : e.target.value})} type="text" placeholder="Address(Optimum)" class="h-50 w-50 px-3 py-3 text-2xl placeholder-blueGray-300 text-black relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring  pr-10"/>
    <div></div>
    <button class="bg-red-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded" onClick={this.onNewTransfer}>
      Confirm
    </button>
    
    </div>
              )
            } else if (this.state.current_page == "source") {
              return (
                this.state.source_transactions.map(item=>(
                  <div>
                    <div className="grid grid-cols-3 text-black bg-white rounded px-3 py-3 w-90 gap-4">
                  <div>
                  Arbitrum -> Optimum 
                  </div>
                  <div>
                    {parseFloat(web3.utils.fromWei(item.amount,'ether')).toFixed(3)} ether + 0.001(Reward)
                  </div>
                  <input value={this.state.address} onChange={e => this.setState({address : e.target.value})}  type="text" placeholder="Withdrawal Address" class="h-50 w-50 px-3 py-3 text-2xl placeholder-blueGray-300 text-black relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring  pr-10"/>
                  <div class=" col-end-6 ...">
                  <button class="bg-red-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded" onClick={() => this.onBuyReciept(item)}>
                  Buy
                </button>
                  </div>
                </div>
                <br></br>
                  </div>
                ))
              )
            } else if (this.state.current_page == "bounty")  {
              return (
                this.state.destination_transactions.map(item=>(
                  <div>
                    <div className="grid grid-cols-3 text-black bg-white rounded px-3 py-3 w-90 gap-4">
                  <div>
                  Arbitrum -> Optimum 
                  </div>
                  <div>
                    {parseFloat(web3.utils.fromWei(item.amount,'ether')).toFixed(3)} ether
                  </div>
                  <div class=" col-end-6 ...">
                  <button class="bg-red-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded" onClick={() => this.onTransferWithdrawl(item)}>
                  Withdraw
                </button>
                  </div>
                </div>
                <br></br>
                  </div>
                ))
              )
            }
          })()}
        
  <br></br>
  
  </div>
      {
        
      }
        </header>
        
      </div>
      // </LoadingOverlay>
    );
  }
}

export default App;
