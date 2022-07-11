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

  // 获取登录 接口
  login(params: any) {
    return this.http.post(ApiConfig.getInstance().loginUrl, params);
  }

  // 添加朋友时搜索 接口
  getUserSearch(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getUserSearchUrl, params, apiToken);
  }

  // 获取NFT列表数据 接口
  getNftList(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getNftListUrl, params, apiToken);
  }

  // 添加NFT数据 接口
  postNftAdd(params?: any, apiToken?: any) {
    return this.http.post(ApiConfig.getInstance().postNftAddUrl, params, apiToken);
  }

  // 获取NFT合约 接口
  getNftContracts(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getNftContractsUrl, params, apiToken);
  }

  // 上传文件 接口
  postFileUpload(params?: any, apiToken?: any) {
    return this.http.post(ApiConfig.getInstance().postFileUploadUrl, params, apiToken);
  }

  // 获取文件 接口
  getFileList(params?: any, apiToken?: any) {
    return this.http.get(ApiConfig.getInstance().getFileListUrl, params, apiToken);
  }

}
