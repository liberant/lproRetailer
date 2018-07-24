import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPage } from './select';
import { NgArrayPipesModule, NgObjectPipesModule, NgStringPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPage),
    NgObjectPipesModule,
    NgArrayPipesModule,
    NgStringPipesModule,
  ],
})
export class SelectPageModule {}
