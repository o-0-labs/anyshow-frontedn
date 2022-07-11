/**
 * api-config 统一配置接口地址
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {HttpHeaders} from '@angular/common/http';
import {DomainType} from '../common/enum';

export class ApiConfig {

  private static instance: ApiConfig;

  readonly defaultHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json', Accept: 'application/json'
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly defaultNativeHeaders = {'Content-Type': 'application/json', Accept: 'application/json'};
  readonly formHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', Accept: 'application/json'
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly uploadHeaders = new HttpHeaders({'Content-Type': 'multipart/form-data'});
  //
  readonly defaultOptions: any = {headers: this.defaultHeaders};
  readonly formOptions: any = {headers: this.formHeaders};
  readonly uploadOptions: any = {headers: this.uploadHeaders};

  // 接口地址配置
  // 用户模块
  readonly loginUrl = 'user/login';  // 登录注册 接口
  readonly getUserSearchUrl = 'user/search';  // 添加朋友时搜索，目前仅支持按地址、昵称搜索 数据接口
  readonly getNftListUrl = 'nft/list';  // 获取NFT列表数据 接口
  readonly postNftAddUrl = 'nft/add';  // 添加NFT数据 接口
  readonly getNftContractsUrl = 'nft/contracts';  // 获取NFT合约 接口
  readonly postFileUploadUrl = 'file/upload';  // 上传文件 接口
  readonly getFileListUrl = 'file/getFileList';  // 获取文件 接口

  private constructor() {
  }

  static getInstance(): ApiConfig {
    if (!ApiConfig.instance) {
      ApiConfig.instance = new ApiConfig();
    }
    return this.instance;
  }

  /**
   * 获取域名
   *
   * @param domainType 类型
   */
  getDomainInfo(domainType: DomainType): any {
    let domain: string;
    switch (domainType) {
      case DomainType.product:
        domain = 'http://39.101.133.17:8080';
        break;
      case DomainType.develop:
        domain = 'http://127.0.0.1:8080';
        break;
      case DomainType.proxy:
        domain = '/proxyApi';
        break;//记得要在angular.json文件中添加"proxyConfig": "proxy.config.json"
      case DomainType.local:
        domain = '';
        break;
      default:
        domain = '';
        break;
    }
    return {domain, domainType};
  }

  // 获取api地址
  getApiHost(platform: any): string {
    if (platform.is('cordova')) {// 如果是真机客户端使用PRODUCT
      return this.getDomainInfo(DomainType.product).domain + '';
    } else {// 如果是浏览器使用PROXY
      return this.getDomainInfo(DomainType.proxy).domain + '';
    }
  }
}
