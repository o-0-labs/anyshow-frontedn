/**
 * HttpNative 封装 HTTP 请求， 方便统一修改和替换底层实现
 * 只能用于真机端Android、iOS
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {ApiConfig} from './api-config';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';
import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpNative {
  url = '';

  constructor(public http: HTTP, private platform: Platform) {
    this.url = ApiConfig.getInstance().getApiHost(platform);
  }

  /**
   * Get 方法封装
   *
   * @param endpoint API接口Url
   * @param params 参数
   * @param apiToken token
   */
  get(endpoint: string, params?: any, apiToken?: any) {
    let defaultHeaders = null;
    if (apiToken) { // 判断有无token
      defaultHeaders = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + apiToken
      };
    } else {
      defaultHeaders = ApiConfig.getInstance().defaultNativeHeaders;
    }
    // 返回值封装为Promise对象，方便统一处理操作
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/' + endpoint, params, defaultHeaders).then((response) => {
        resolve(JSON.parse(response.data)); // 原生的HTTP必须转换为对象，不然报错
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * Post 方法封装
   *
   * @param endpoint API接口Url
   * @param body 参数对象
   * @param apiToken token
   */
  post(endpoint: string, body: any, apiToken?: any) {
    let defaultHeaders = null;
    if (apiToken) {// 判断有无token
      defaultHeaders = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + apiToken
      };
    } else {
      defaultHeaders = ApiConfig.getInstance().defaultNativeHeaders;
    }
    // 返回值封装为Promise对象，方便统一处理操作
    return new Promise((resolve, reject) => {
      this.http.setDataSerializer('json'); // 必须设置序列化json，不然后端使用@RequestBody注解不能解析数据
      this.http.post(this.url + '/' + endpoint, body, defaultHeaders).then((response) => {
        resolve(JSON.parse(response.data)); // 原生的HTTP必须转换为对象，不然报错
      }, (error) => {
        reject(error);
      });
    });
  }
}
