import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { filter, find, pluck } from 'rxjs/operators';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';

@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {
  user: User;
  productsList: Observable<Product[]>;
  groupvar = 'region';
  ordervar = 'unitCost';


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public afs: FirestoreProvider, public op: OrdersProvider, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.user = auth.user$.value;
   // this.op.load(this.user.busId);
  }

  ionViewWillEnter() {
    this.productsList = this.afs.col$<Product>(`product`);
  }

  detail(id: string) {
    this.navCtrl.push('ProductDetailPage', { id });
  }

  openList(type) {
    const listModal = this.modalCtrl.create('ListPage', { type });
    listModal.present();
  }

}
