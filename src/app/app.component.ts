import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from './providers/common/app-service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private appService: AppService,
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        // make your native API calls
        // 竖屏锁定
        this.appService.lockPortrait();
      } else {
        // fallback to browser APIs
      }
    });
    // 首页初始化设置
    this.appService.initRootPage();
    // 语言初始化设置
    this.appService.initLanguage();
    // 主题初始化设置
    this.appService.initTheme();

  }
}
