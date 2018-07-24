import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPage),
    NgArrayPipesModule,
    NgObjectPipesModule,
  ],
})
export class OrderPageModule {}
