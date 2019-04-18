import { BookdetailsPage } from './../pages/bookdetails/bookdetails';
import { UserbooksPage } from './../pages/userbooks/userbooks';

import { Network } from '@ionic-native/network';
import { NetworkServiceProvider } from './../NetworkServiceProvider';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddDataPage } from '../pages/add-data/add-data';
import { EditDataPage } from '../pages/edit-data/edit-data';
import { Geolocation } from '@ionic-native/geolocation'


@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    HomePage,
    AddDataPage,
    EditDataPage,
    UserbooksPage,
    BookdetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddDataPage,
    EditDataPage, LoginPage,
    UserbooksPage,
    BookdetailsPage
  ],
  providers: [
    NetworkServiceProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    Toast,
    Network,
    Geolocation,



  ]
})
export class AppModule { }
