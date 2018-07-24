import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  profileRoot = 'ProfilePage';
  selectRoot = 'SelectPage';
  orderRoot = 'OrderPage';
  receiveRoot = 'ReceivePage';

  constructor() {

  }
}
