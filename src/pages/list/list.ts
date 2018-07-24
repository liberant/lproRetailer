import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider} from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  user: User;
  productsList$: Observable<Product[]>;
  listType: string;
  groupvar = 'variety';
  ordervar = 'unitCost';


  constructor(public navCtrl: NavController, public navParams: NavParams, auth: AuthProvider, public afs: FirestoreProvider, public op: OrdersProvider, public viewCtrl: ViewController) {
    this.listType = navParams.get('type');
    this.user = auth.user$.value;
  }

  ionViewDidLoad() {
    this.productsList$ = this.afs.col$<Product>(`business/${this.user.busId}/${this.listType}`);
  }

  detail(id: string) {
    this.navCtrl.push('ProductDetailPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
