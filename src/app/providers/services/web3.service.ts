import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider'; // this profile wallet handler
// @ts-ignore
import {provider} from 'web3-core';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {META_MASK_FOX} from '../../pages';
import {simpleStorageABI, simpleStorageContractAddress} from "../contracts/simple-storage";

@Injectable({
  providedIn: 'root'
})

export class Web3Service {
  public accountsObservable = new Subject<string[]>();
  web3Modal;
  web3js: any;
  provider: provider | undefined;
  accounts: string[] | undefined;
  balance: string | undefined;
  sign: string | undefined;
  simpleStorage: any;

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required | here whe import the package necessary to support wallets||
        options: {
          infuraId: 'env', // required change this with your own infura id | cambia esto con tu apikey de infura
          description: 'Scan the qr code and sign in', // You can change the desciption |
          qrcodeModalOptions: {
            mobileLinks: [
              'rainbow',
              'metamask',
              'argent',
              'trust',
              'imtoken',
              'pillar'
            ]
          }
        }
      },
      injected: {
        display: {
          logo: META_MASK_FOX,
          name: 'metamask',
          description: 'Connect with the provider in your Browser'
        },
        package: null
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'mainnet', // optional change this with the net you want to use like rinkeby etc | puedes cambiar a una red de pruebas o etc
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)'
      }
    });
  }

  /**
   * 连接钱包
   */
  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    if (this.provider) {
      this.web3js = new Web3(this.provider);
    } // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    console.log(this.accounts);
    return this.accounts;
  }

  /**
   *  获取账户余额
   *
   * @param account 账号
   */
  async accountInfo(account: any[]) {
    const initialvalue = await this.web3js.eth.getBalance(account);
    this.balance = this.web3js.utils.fromWei(initialvalue, 'ether');
    return this.balance;
  }

  /**
   * 消息签名
   */
  async messageSign(message: string) {
    await this.connectAccount();
    if (this.accounts.length > 0) {
      await this.web3js.eth.personal.sign(this.web3js.utils.utf8ToHex(message), this.accounts[0], null, (err, signature) => {
        this.sign = signature;
        // console.log('地址：'+this.accounts[0]);
        // console.log('内容：'+message);
        // console.log('签名结果：'+this.sign);
        return this.sign;
      });
    }
  }

  /**
   * 存数据合约调用
   */
  async setDataContract(number) {
    await this.connectAccount();
    this.simpleStorage = new this.web3js.eth.Contract(simpleStorageABI, simpleStorageContractAddress);
    return await this.simpleStorage.methods.set(number).call().then(console.log);
  }

  /**
   * 取数据合约调用
   */
  async getDataContract() {
    await this.connectAccount();
    this.simpleStorage = new this.web3js.eth.Contract(simpleStorageABI, simpleStorageContractAddress);
    return await this.simpleStorage.methods.get().call().then(console.log);
  }
}
