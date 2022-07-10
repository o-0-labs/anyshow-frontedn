import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('./friends/friends.module').then(m => m.FriendsPageModule)
      },
      {
        path: 'photo',
        loadChildren: () => import('./photo/photo.module').then(m => m.PhotoPageModule)
      },
      {
        path: 'mine',
        loadChildren: () => import('./mine/mine.module').then(m => m.MinePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
