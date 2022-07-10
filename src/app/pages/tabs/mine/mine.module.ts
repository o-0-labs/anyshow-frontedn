import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MinePage} from './mine.page';

import {MinePageRoutingModule} from './mine-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: MinePage}]),
    MinePageRoutingModule,
    TranslateModule,
  ],
  declarations: [MinePage]
})
export class MinePageModule {
}
