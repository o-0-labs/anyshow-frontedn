import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {mainPage} from '../index';
import {NavController} from '@ionic/angular';
import {CacheKeys, CacheService} from '../../providers/common/cache-service';
import {Prompt} from '../../providers/common/prompt';
import {Api} from '../../providers/api/api';
import {Web3Service} from '../../providers/services/web3.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  accounts: {
    walletAddress: string,
    signMessage: string,
    signature: string
  };
  walletAddress: string[] | undefined;
  private loginError: string;
  private loginMobileError: string;
  private loginPasswordError: string;
  private loggingIn: string;

  constructor(private cacheService: CacheService,
              public translate: TranslateService,
              public navController: NavController,
              public api: Api,
              public web3Service: Web3Service,
              private prompt: Prompt) {
    this.accounts = {
      walletAddress: '',
      signMessage: '',
      signature: ''
    };
    this.changeLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.changeLanguage();
    });
  }

  ngOnInit() {
    // this.web3Service.setDataContract(123).then().catch();
  }

  /**
   * 用户登录注册方法
   *
   * @author 李元坝
   * @date 20220702
   */
  async doLogin() {
    this.walletAddress = await this.web3Service.connectAccount();
    if (this.walletAddress.length < 0) {
      this.prompt.showToast(this.loginMobileError, 'danger');
      return false;
    }
    this.accounts.signature = await this.web3Service.messageSign(this.walletAddress[0]);
    const loading = this.prompt.showLoading(this.loggingIn);
    this.accounts.walletAddress = this.walletAddress[0];
    this.accounts.signMessage = this.walletAddress[0];

    this.api.login(this.accounts).then((resp: any) => {
      loading.then(response => {
        response.dismiss().then(); // 取消正在登录加载动画
      });
      if (resp.data == null) {
        this.prompt.showToast(this.loginError, 'danger');
        return false;
      }
      // 存储用户信息及 token
      this.cacheService.set(CacheKeys.user, resp.data).catch();
      this.cacheService.set(CacheKeys.token, resp.data.token).catch();
      this.navController.navigateRoot(mainPage).then();
    }, (err) => {
      loading.then(response => {
        response.dismiss().then(); // 取消正在登录加载动画
      });
      console.log(JSON.stringify(err));
      this.prompt.showAlert(this.loginError + '-' + JSON.stringify(err));
    });
  }

  /**
   * 更换语言
   */
  changeLanguage() {
    this.translate.get(['LOGIN_ERROR', 'LOGIN_MOBILE_ERROR', 'LOGGING_IN', 'LOGIN_PASSWORD_ERROR']).subscribe((values) => {
      this.loginError = values.LOGIN_ERROR;
      this.loginMobileError = values.LOGIN_MOBILE_ERROR;
      this.loginPasswordError = values.LOGIN_PASSWORD_ERROR;
      this.loggingIn = values.LOGGING_IN;
    });
  }


  /**
   * 消息签名
   *
   * @param message 待签名内容
   */
  messageSign(message: string) {
    this.web3Service.messageSign(message).then().catch();
  }
}
