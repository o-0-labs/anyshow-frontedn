/**
 * Api接口
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {HttpWeb} from './http-web';
import {ApiConfig} from './api-config';
import {HttpNative} from './http-native';
import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class Api {
  http: any;

  constructor(public httpWeb: HttpWeb, private platform: Platform, public httpNative: HttpNative) {
    if (this.platform.is('cordova')) {// 如果是真机客户端使用 httpNative
      this.http = httpNative;
    } else {// 如果是浏览器使用 httpWeb
      this.http = httpWeb;
    }
  }

  // 获取登录接口
  login(params: any) {
    return this.http.post(ApiConfig.getInstance().loginUrl, params);
  }

  // 获取资金变化列表接口
  getAccountAmount(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getAccountAmountUrl, params, apiToken);
  }

  // 获取定时任务管理列表数据接口
  getTraderTaskCornList(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getTraderTaskCornListUrl, params, apiToken);
  }

  // 获取更新定时任务数据接口
  postTraderTaskCornUpdateById(params?: any, apiToken?: any) {
    return this.http.post(ApiConfig.getInstance().postTraderTaskCornUpdateByIdUrl, params, apiToken);
  }

  // 获取更新全部定时任务状态接口
  getTraderTaskCornUpdateScheduledStatus(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getTraderTaskCornUpdateScheduledStatusUrl, params, apiToken);
  }

}
