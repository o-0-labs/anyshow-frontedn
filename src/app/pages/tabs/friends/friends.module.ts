import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FriendsPage} from './friends.page';

import {FriendsPageRoutingModule} from './friends-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FriendsPageRoutingModule,
        TranslateModule
    ],
  declarations: [FriendsPage]
})
export class FriendsPageModule {
}
