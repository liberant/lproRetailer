import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, auth: AuthProvider, public afs: FirestoreProvider, public op: OrdersProvider, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.user = auth.user$.value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
    this.productsList = this.afs.col$<Product>(`product`);
  }

  detail(id: string) {
    this.navCtrl.push('ProductDetailPage', { id });
  }

  openList(type) {
    const listModal = this.modalCtrl.create('ListPage', { type });
    listModal.present();
  }

  async addToList(toList: string, product: Product) {
    console.log(toList, product, this.user);
    const msg = this.afs.upsert(`business/${this.user.busId}/${toList}/${product.id}`, {product});
    this.presentToast(`${product.name} added successfully to ${toList}`);
    console.log(msg);
  }


  presentToast(message) {
    const toast = this.toastCtrl.create({
      message, duration: 3000, position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
