/**
 * prompt 通用提示框控件封装
 *
 * @author 李元坝
 * @since 2022/07/02
 */
import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class Prompt {
  alertConfirmHeader: any;
  confirmButton: any;
  cancelButton: any;

  constructor(private toastController: ToastController,
              private alertController: AlertController,
              public translate: TranslateService,
              private loadingController: LoadingController) {
    this.changeLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.changeLanguage();
    });
  }

  /**
   * 更换语言
   */
  changeLanguage() {
    this.translate.get(['ALERT_CONFIRM_HEADER', 'CONFIRM_BUTTON', 'CANCEL_BUTTON']).subscribe(values => {
      this.alertConfirmHeader = values.ALERT_CONFIRM_HEADER;
      this.confirmButton = values.CONFIRM_BUTTON;
      this.cancelButton = values.CANCEL_BUTTON;
    });
  }

  /**
   * 提示方法封装，用例：this.prompt.showToast('账号不能为空');
   *
   * @param message 文本内容
   * @param color 颜色 'primary''secondary''tertiary''success''warning''danger''light''medium''dark';
   */
  showToast(message: string, color: string) {
    const toast = this.toastController.create({
      header: this.alertConfirmHeader,
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.then(response => {
      response.present().then();
    });
  }

  /**
   * 加载方法封装，用例：this.prompt.showLoading('正在登录');
   *
   * @param content 文本内容
   */
  showLoading(content: string) {
    const loading = this.loadingController.create({
      spinner: 'bubbles',
      message: content,
      translucent: true
    });
    loading.then(response => {
      response.present().then();
    });
    return loading;
  }

  /**
   * 弹框方法封装，用例：this.prompt.showAlert('登录成功');
   *
   * @param message 文本内容
   */
  showAlert(message: string) {
    const alert = this.alertController.create({
      header: this.alertConfirmHeader,
      message,
      buttons: [this.confirmButton]
    });
    alert.then(response => {
      response.present().then();
    });
  }

  /**
   * 弹框方法封装，用例：this.prompt.showAlert('登录成功');
   *
   * @param message 文本内容
   * @param confirmCallbackFunction 确认回调方法
   * @param cancelCallbackFunction 取消回调方法
   */
  showAlertConfirm(message: string, confirmCallbackFunction?: () => void, cancelCallbackFunction?: () => void) {
    const alertConfirm = this.alertController.create({
      header: this.alertConfirmHeader,
      message,
      buttons: [{
        text: this.cancelButton,
        role: 'cancel',
        handler: cancelCallbackFunction
      }, {
        text: this.confirmButton,
        handler: confirmCallbackFunction
      }]
    });
    alertConfirm.then(response => {
      response.present().then();
    });
  }
}
