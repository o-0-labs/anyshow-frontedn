import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {loginPage, AVATAR} from '../../index';
import {Prompt} from '../../../providers/common/prompt';
import {CacheKeys, CacheService} from '../../../providers/common/cache-service';
import {Language} from '../../../providers/common/enum';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {
  user: any = {};
  avatar: string = AVATAR;
  isThemeToggled = false;
  isLanguageToggled = false;
  private getUserError: string;
  private getThemeError: string;
  private getLanguageError: string;
  constructor(public translate: TranslateService,
              private prompt: Prompt,
              public navController: NavController,
              private cacheService: CacheService) {
    // 获取用户信息
    this.cacheService.get(CacheKeys.user).then((response: any) => {
      if (response == null) {
        this.prompt.showToast(this.getUserError, 'danger');
        return false;
      }
      this.user = response;
    }).catch();
    // 初始化主题信息
    this.cacheService.get(CacheKeys.themeIsToggled).then((response: any) => {
      if (response == null) {
        this.prompt.showToast(this.getThemeError, 'danger');
        return false;
      }
      this.isThemeToggled = response;
    }).catch();
    // 初始化语言信息
    this.cacheService.get(CacheKeys.languageIsToggled).then((response: any) => {
      if (response == null) {
        this.prompt.showToast(this.getLanguageError, 'danger');
        return false;
      }
      this.isLanguageToggled = response;
    }).catch();

    this.changeLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.changeLanguage();
    });
  }

  ngOnInit() {
  }


  /**
   * 主题切换方法
   */
  notifyTheme() {
    const that = this;
    if (that.isThemeToggled) {
      document.body.classList.toggle('dark', true);
    } else {
      document.body.classList.toggle('dark', false);
    }
    this.cacheService.set(CacheKeys.themeIsToggled, that.isThemeToggled).catch();
  }

  /**
   * 语言切换方法：默认中文
   */
  notifyLanguage() {
    const that = this;
    if (that.isLanguageToggled) {
      that.translate.use(Language.languageEN);
    } else {
      that.translate.use(Language.languageDefault);
    }
    that.cacheService.set(CacheKeys.languageIsToggled, that.isLanguageToggled).catch();
  }

  /**
   * 用户登出方法
   */
  logout() {
    this.cacheService.remove(CacheKeys.user).catch();
    this.cacheService.remove(CacheKeys.token).catch();
    this.navController.navigateForward(loginPage).then(); // 跳转到登录页面
  }

  /**
   * 更换语言
   */
  changeLanguage() {
    this.translate.get(['GET_USER_ERROR', 'GET_THEME_ERROR', 'GET_LANGUAGE_ERROR']).subscribe(values => {
      this.getUserError = values.GET_USER_ERROR;
      this.getThemeError = values.GET_THEME_ERROR;
      this.getLanguageError = values.GET_LANGUAGE_ERROR;
    });
  }
}
