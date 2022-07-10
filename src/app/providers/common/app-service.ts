/**
 * app-service App 管理类
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {Injectable} from '@angular/core';
import {AppVersion} from '@awesome-cordova-plugins/app-version/ngx'; // APP版本插件
import {Observable} from 'rxjs';
import {CacheService, CacheKeys} from './cache-service'; // 缓存组件
import {TranslateService} from '@ngx-translate/core'; // APP国际化语言插件
import {ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation/ngx'; // 屏幕插件
import {loginPage, mainPage, tutorialPage} from '../../pages'; // 启动页面
import {Router} from '@angular/router';
import {Language} from './enum';

@Injectable()
export class AppService {

  constructor(private screenOrientation: ScreenOrientation,
              private translate: TranslateService,
              private cacheService: CacheService,
              private router: Router,
              private appVersion: AppVersion) {
  }

  /**
   * 初始化语言设置
   */
  initLanguage() {
    this.translate.addLangs([Language.languageEN, Language.languageDefault]); // 添加语言支持
    this.translate.setDefaultLang(Language.languageDefault); // 设置默认为中文
    this.cacheService.get(CacheKeys.languageIsToggled).then(response => {
      if (response === true) {
        this.translate.use(Language.languageEN);
      } else {
        this.translate.use(Language.languageDefault); // 中文
        this.cacheService.set(CacheKeys.languageIsToggled, false).catch(); // 存储语言设置标志位
      }
    });
  }

  /**
   * 初始化首页设置
   */
  initRootPage() {// 首次运行时显示引导页
    this.cacheService.get(CacheKeys.launched).then(response => {
      if (response === true) {
        // 获取用户信息,如果用户会话信息存在就不重新跳转登录界面
        this.cacheService.get(CacheKeys.user).then((data: any) => {
          if (data == null) {
            this.router.navigate([loginPage]).then();
          } else {
            this.router.navigate([mainPage]).then();
          }
        });
      } else {
        this.router.navigate([tutorialPage]).then();
      }
    });
  }

  // 初始化主题设置
  initTheme() {
    this.cacheService.get(CacheKeys.themeIsToggled).then(response => {
        if (response === true) {
          document.body.classList.toggle('dark', true); // 夜间模式
        } else {
          document.body.classList.toggle('dark', false);
          this.cacheService.set(CacheKeys.themeIsToggled, false).catch(); // 存储主题设置标志位
        }
      }
    );
  }

  /**
   * 锁定竖屏
   */
  lockPortrait() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();
  }

  /**
   * 锁定横屏
   */
  lockLandscape() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then();
  }

  /**
   * 解除屏幕锁定
   */
  unlockOrientation() {
    this.screenOrientation.unlock();
  }

  /**
   * 监听屏幕旋转
   */
  onScreenChange(): Observable<void> {
    return this.screenOrientation.onChange();
  }

  /**
   * 获取 App 版本号
   *
   * @description  对应/config.xml中version的值
   */
  getVersionNumber(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error('获取版本号失败');
      });
    });
  }

  /**
   * 获取 App name
   *
   * @description  对应/config.xml中name的值
   */
  getAppName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getAppName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error('获取 App name 失败');
      });
    });
  }

  /**
   * 获取 App 包名/id
   *
   * @description  对应/config.xml中id的值
   */
  getPackageName(): Observable<string> {
    return Observable.create(observer => {
      this.appVersion.getPackageName().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error('获取包名失败');
      });
    });
  }


}
