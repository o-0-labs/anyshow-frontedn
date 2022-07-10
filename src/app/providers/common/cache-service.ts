/**
 * cache-service 缓存工具类封装
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

export enum CacheKeys {
  launched, // 标记是否首次运行
  appVersion, // App 版本
  token, // token
  user, // 用户信息
  languageIsToggled, // 是否设置语言
  themeIsToggled, // 是否设置主题
}

@Injectable()
export class CacheService {

  constructor(public storage: Storage) {
    this.storage.create().then();//初始化存储服务
  }

  get(key: CacheKeys): Promise<any> {
    return this.storage.get(CacheKeys[key]);
  }

  set(key: CacheKeys, value: any): Promise<any> {
    return this.storage.set(CacheKeys[key], value);
  }

  clear() {
    return this.storage.clear();
  }

  remove(key: CacheKeys): Promise<any> {
    return this.storage.remove(CacheKeys[key]);
  }

}
