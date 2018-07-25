import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';

import { Business } from '../../models/business-model';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [GroupByPipe, PairsPipe],
})
export class OrderPage {
  user: User;
  business: Business;
  // productsList$: Observable<Product[]>;
  groupvar = 'region';
  ordervar = 'unitCost';

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public op: OrdersProvider, public groupby: GroupByPipe, public pairs: PairsPipe) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  detail(id: string) {
    this.navCtrl.push('ProductDetailPage', { id });
  }

  saveQty(id: string, qty) {
    qty = parseFloat(qty);
    this.afs.update<Product>(`business/${this.business.id}/winelist/${id}`, { qty });
  }

  async order() {
    const orderItems = [];
    await this.afs.getCol<Product>(`business/${this.business.id}/winelist`).then(product => {
      console.log(product);
      product.forEach(prod => {
        if (prod.qty >= 1) {
          orderItems.push(prod);
        }
      });
    });
    const producers = await this.groupby.transform(orderItems, 'producer');
    for (const i in producers) {
      this.op.placeOrder(this.business, producers[i]);
    }
  }
}
