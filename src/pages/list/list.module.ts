import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    NgArrayPipesModule,
    NgObjectPipesModule,
  ],
})
export class ListPageModule {}
