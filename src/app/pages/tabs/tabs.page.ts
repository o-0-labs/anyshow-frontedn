import {Component} from '@angular/core';
import {tab1Root, tab2Root, tab3Root, tab4Root} from '../index';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tab1Root: any = tab1Root;
  tab2Root: any = tab2Root;
  tab3Root: any = tab3Root;
  tab4Root: any = tab4Root;
  tab1Title = ' ';
  tab2Title = ' ';
  tab3Title = ' ';
  tab4Title = ' ';

  constructor(public translate: TranslateService) {
    this.changeLanguage();
    this.translate.onLangChange.subscribe(() => {
      this.changeLanguage();
    });
  }

  /**
   * 更换语言
   */
  changeLanguage() {
    this.translate.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
      this.tab1Title = values.TAB1_TITLE;
      this.tab2Title = values.TAB2_TITLE;
      this.tab3Title = values.TAB3_TITLE;
      this.tab4Title = values.TAB4_TITLE;
    });
  }
}
