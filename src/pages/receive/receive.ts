import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';

@IonicPage() @Component({
  selector: 'pagee-receive', templateUrl: 'receive.html',
})
export class ReceivePage {
  user: User;
  business: Business;
  ordersList: Observable<Order[]>;
  statusList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, private auth: AuthProvider, public op: OrdersProvider) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
    this.statusList = [ { order: 1, val: 'Submitted' }, { order: 2, val: 'Approved' }, { order: 3, val: 'Shipped' }, { order: 4, val: 'Received' } ];
  }

  ionViewWillLoad() {
    this.ordersList = this.afs.col$<Order>('orders', ref => {
      return ref.where('rid', '==', this.business.id);
    });
  }

  detail(id: string) {
    this.navCtrl.push('OrderDetailPage', { id });
  }

}
