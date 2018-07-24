import { Injectable } from '@angular/core';
import { FirestoreProvider } from '../firestore/firestore';
import { AuthProvider } from '../auth/auth';
import { Product } from '../../models/product-model';
import { Observable } from 'rxjs';
import { ToastController } from 'ionic-angular';
import { Business } from '../../models/business-model';


@Injectable()

export class OrdersProvider {
  wineList: Observable<Product[]>;
  shortList: Observable<Product[]>;

  constructor(public afs: FirestoreProvider, public auth: AuthProvider, public toastCtrl: ToastController) {
    console.log('Hello OrdersProvider Provider');
  }

  load(bid): void {
    this.wineList = this.afs.col$<Product>(`business/${bid}/winelist`);
    this.shortList = this.afs.col$<Product>(`business/${bid}/shortlist`);
  }

  contact(id) {
    console.log(id);
  }
}
