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
  readonly loginUrl = 'api/auth/login';  // 登录接口
  readonly getAccountAmountUrl = 'api/trader-amount/extraEchartsList';  // 获取资金数据接口
  readonly getTraderTaskCornListUrl = 'api/trader-task-corn/associatedList';  // 获取定时任务管理列表数据接口
  readonly postTraderTaskCornUpdateByIdUrl = 'api/trader-task-corn/updateById';  // 更新定时任务数据接口
  readonly getTraderTaskCornUpdateScheduledStatusUrl = 'api/trader-task-corn/updateScheduledStatus';  // 更新全部定时任务状态接口

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
        domain = 'http://39.101.133.17:9999';
        break;
      case DomainType.develop:
        domain = 'http://127.0.0.1:9999';
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
