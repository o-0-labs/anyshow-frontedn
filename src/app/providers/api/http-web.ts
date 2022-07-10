/**
 * HttpWeb 封装 HTTP 请求， 方便统一修改和替换底层实现
 * 用于开发环境、Web端调试
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {ApiConfig} from './api-config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpWeb {
    url = '';

    constructor(public http: HttpClient, private platform: Platform) {
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
        let reqOpts = null;
        if (apiToken) { // 判断有无token
            reqOpts = {
                headers: new HttpHeaders({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/json',
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    Accept: 'application/json',
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: 'Bearer ' + apiToken
                }),
                params: new HttpParams()
            };
        } else {
            reqOpts = {
                params: new HttpParams()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
          // eslint-disable-next-line guard-for-in
            for (const k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        // 返回值封装为Promise对象，方便统一处理操作
        return new Promise((resolve, reject) => {
            this.http.get(this.url + '/' + endpoint, reqOpts).subscribe((response) => {
                resolve(response);
            }, (err) => {
                reject(err);
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
        let reqOpts = null;
        if (apiToken) {// 判断有无token
            reqOpts = {
                headers: new HttpHeaders({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/json',
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    Accept: 'application/json',
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                    Authorization: 'Bearer ' + apiToken
                })
            };
        } else {
            reqOpts = ApiConfig.getInstance().defaultOptions;
        }
        // 返回值封装为Promise对象，方便统一处理操作
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/' + endpoint, body, reqOpts).subscribe((response) => {
                resolve(response);
            }, (err) => {
                reject(err);
            });
        });
    }
}
