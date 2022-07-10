import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage-angular';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppService} from './providers/common/app-service';
import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';
import {ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation/ngx';
import {CacheService} from './providers/common/cache-service';
import {Prompt} from './providers/common/prompt';
import {AppVersion} from '@awesome-cordova-plugins/app-version/ngx';
import {HttpNative} from './providers/api/http-native';
import {HttpWeb} from './providers/api/http-web';
import {Api} from './providers/api/api';
import {PhotoService} from './providers/services/photo.service';
// The translation loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    HTTP,
    AppService,
    SplashScreen,
    AppVersion,
    StatusBar,
    ScreenOrientation,
    CacheService,
    Prompt,
    HttpNative,
    HttpWeb,
    Api,
    PhotoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
