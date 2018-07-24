import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivePage } from './receive';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    ReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivePage),
    NgArrayPipesModule,
    NgObjectPipesModule,
  ],
})
export class ReceivePageModule {}
