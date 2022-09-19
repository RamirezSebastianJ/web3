import { Component } from "@angular/core";
import { Web3Auth } from "@web3auth/web3auth";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./ethersRPC";
import { ethers } from "ethers";
import { marketplaceAddress } from "config";
const clientId = "BPKMmWlpoRv4hu6Lx-PAiviW7KQKeVOz7BoFBAzWPSNRFE0EGtZL0e7YdOID-fzA9clnvS0Bxtk9F32eTJo6ufk"; // get from https://dashboard.web3auth.io

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})


export class AppComponent {
    title = "angular-app";
    web3auth: Web3Auth | null = null;
    provider: SafeEventEmitterProvider | null = null;
    isModalLoaded = false;

    
 ipfsClient = require('ipfs-http-client');

 projectId = '2EBPJP8Hry8AljsjbbcW4axwfSn';
 projectSecret = '665e6b8eeb7425bda1c6a11aa9e84e92';
 auth =
 'Basic ' + Buffer.from(this.projectId + ':' + this.projectSecret).toString('base64');
 client = this.ipfsClient.create({
  url: 'https://infura-ipfs.io:5001/api/v0',
  headers: {
      authorization: this.auth,
  },
});

 

    async ngOnInit() {
      this.web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x89",
          rpcTarget: "https://rpc-mainnet.matic.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["facebook", "google"],
          appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
        }
      });
      const web3auth = this.web3auth

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId,
          network: "testnet",
          uxMode: "popup", 
          whiteLabel: {
            name: "Your app Name",
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en",
            dark: true, // whether to enable dark mode. defaultValue: false
          }, 
        },
      });
      web3auth.configureAdapter(openloginAdapter);

      await web3auth.initModal({
        modalConfig: {
          [WALLET_ADAPTERS.OPENLOGIN]: {
            label: "openlogin",
            loginMethods: {
              reddit: {
                showOnModal: false,
                name: "reddit",
              },
            },
          },
        },
      });
      if (web3auth.provider) {
        this.provider = web3auth.provider;
      }
      this.isModalLoaded = true;
    }

    login = async () => {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3auth = this.web3auth;
    this.provider = await web3auth.connect();
    console.log("logged in");
    };

    getUserInfo = async () => {
      if (!this.web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await this.web3auth.getUserInfo();
      console.log(user);
    };

    getChainId = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const chainId = await rpc.getChainId();
      console.log(chainId);
    };
    getAccounts = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const address = await rpc.getAccounts();
      console.log(address);
    };

    getBalance = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const balance = await rpc.getBalance();
      console.log(balance);
    };

    sendTransaction = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const receipt = await rpc.sendTransaction();
      console.log(receipt);
    };

    signMessage = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const signedMessage = await rpc.signMessage();
      console.log(signedMessage);
    };

    getPrivateKey = async () => {
      if (!this.provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      const privateKey = await rpc.getPrivateKey();
      console.log(privateKey);
    };


    

    logout = async () => {
      if (!this.web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      await this.web3auth.logout();
      this.provider = null;
      console.log("logged out");
    };
}