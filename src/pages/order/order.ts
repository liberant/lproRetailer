import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public op: OrdersProvider, public groupBy: GroupByPipe, public pairs: PairsPipe) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  ionViewDidLoad() {
   // this.op.load(this.business.id);
   // this.productsList$ = this.op.wineList$;
  }

  detail(id: string) {
    this.navCtrl.push('ProductDetailPage', { id });
  }

  saveQty(id: string, qty) {
    qty = parseFloat(qty);
    this.afs.update<Product>(`business/${this.business.id}/winelist/${id}`, { qty });
    // this.op.presentToast(`${qty} bottles were added to yor cart`);
  }

  order() {
    const orderItems = [];
    this.op.wineList$.pipe(first()).subscribe(product => {
      product.forEach(prod => {
        if (prod.qty >= 1) {
          orderItems.push(prod);
        }
      });
    });
    const producers = this.groupBy.transform(orderItems, 'producer');
    for (const i in producers) {
      console.log(producers[ i ]);
      this.op.placeOrder(producers[i]);
    }
  }
}
