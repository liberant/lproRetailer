import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FirestoreProvider } from '../firestore/firestore';
import { AuthProvider } from '../auth/auth';
import { Product } from '../../models/product-model';
import { Observable } from 'rxjs';
import { Business } from '../../models/business-model';

@Injectable()

export class OrdersProvider {
  business: Business;
  wineList$: Observable<Product[]>;
  shortList$: Observable<Product[]>;

  constructor(public afs: FirestoreProvider, public auth: AuthProvider, public toastCtrl: ToastController) {
    const bid = auth.business$.value.id;
    this.wineList$ = this.afs.col$<Product>(`business/${bid}/winelist`);
    this.shortList$ = this.afs.col$<Product>(`business/${bid}/shortlist`);
  }

  async addToList(toList: string, product: Product, busId) {
    const msg = this.afs.upsert(`business/${busId}/${toList}/${product.id}`, product);
    this.presentToast(`${product.name} added successfully to ${toList}`);
    console.log(msg);
  }

  async placeOrder(order) {
    console.log(order);
    const oid = this.afs.getId();
    const retailer = await this.afs.get(`business/${order.rid}`, 'name');
    const today = new Date();
    order[ 1 ].forEach(product => {
      this.afs.add(`orders/${oid}/products`, product);
      this.afs.update(`business/${order.rid}/winelist/${product.id}`, {
        qty: undefined, onOrder: product.onOrder + product.qty });
    });
    const newOrder = {
      id: oid,
      rid: order.rid,
      retailer,
      pid: order[ 1 ][ 0 ].pid,
      producer: order[ 0 ],
      total: order.total,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted',
    };
    this.afs.set(`orders/${oid}`, newOrder);

  }

  contact(id) {
    console.log(id);
  }
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message, duration: 3000, position: 'top'});

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
