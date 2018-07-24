import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile'
import { SelectPage } from '../pages/select/select';
import { OrderPage } from '../pages/order/order';
import { ReceivePage } from '../pages/receive/receive';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { firebaseConfig } from './credentials';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { OrdersProvider } from '../providers/orders/orders';

import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    SelectPage,
    OrderPage,
    ReceivePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgPipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    SelectPage,
    OrderPage,
    ReceivePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirestoreProvider,
    OrdersProvider
  ]
})
export class AppModule {}
