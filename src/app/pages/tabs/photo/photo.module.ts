import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PhotoPage} from './photo.page';

import {PhotoPageRoutingModule} from './photo-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: PhotoPage}]),
    PhotoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [PhotoPage]
})
export class PhotoPageModule {
}
