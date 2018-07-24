import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  @ViewChild('productProfile') content: Content;

  id: string;
  user: User;
  path: string;
  product$: Observable<Product>;
  state: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public auth: AuthProvider,  public op: OrdersProvider) {
    this.user = this.auth.user$.getValue();
    this.id = this.navParams.get('id');

  }
  ionViewDidLoad() {
    this.product$ = this.afs.doc$<Product>(`product/${this.id}`);
  }

}
