import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { Product } from '../../models/product-model';
import { AuthProvider } from '../auth/auth';
import { FirestoreProvider } from '../firestore/firestore';

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

  async placeOrder(business, order) {
    console.log(order);
    const oid = this.afs.getId();
    const today = new Date();
    let total = 0;
    order.forEach(product => {
      this.afs.update(`business/${business.id}/winelist/${product.id}`, {
        qty: (null), onOrder: product.onOrder + product.qty });
      total = +(product.qty * product.unitCost);
    });
    const newOrder = {
      id: oid,
      rid: business.id,
      retailer: business.name,
      pid: order[ 0 ].pid,
      producer: order[ 0 ].producer,
      products: order,
      total,
      orderDate: today,
      approved: false,
      shipped: false,
      received: false,
      status: 'submitted',
    };
    console.log(newOrder);
    this.afs.set<Order>(`orders/${oid}`, newOrder);

  }
  receiveOrder(id) {
    const today = new Date();
    this.afs.update<Order>(`orders/${id}`, { status: 'received', received: true, receivedDate: today });
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
