import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinePage } from './mine.page';

const routes: Routes = [
  {
    path: '',
    component: MinePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinePageRoutingModule {}
