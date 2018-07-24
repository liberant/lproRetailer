import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile'
import { SelectPage } from '../select/select';
import { OrderPage } from '../order/order';
import { ReceivePage } from '../receive/receive';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  profileRoot = ProfilePage;
  selectRoot = SelectPage;
  orderRoot = OrderPage;
  receiveRoot = ReceivePage;

  constructor() {

  }
}
