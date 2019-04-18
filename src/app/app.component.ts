import { Network } from '@ionic-native/network';
import { NetworkServiceProvider } from './../NetworkServiceProvider';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  isNetworkConnected: boolean = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public networkServiceProvider: NetworkServiceProvider, public network: Network, private sqlite: SQLite, private toast: Toast) {
    platform.ready().then(() => {
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkNetworkConnectivity();
      this.createData();

    });
  }
  createData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table if not exists Books(isbn INTEGER PRIMARY KEY NOT NULL, name varchar(100), publisheddate TEXT,addeddate TEXT, type varchar(100))', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log('executed failed' + e));



    }).catch(e => console.log(e));
  }
  checkNetworkConnectivity() {
    if (this.network.type == 'none') {
      console.log('Dismiss Button Clicked!');

      console.log('please check your internet connection');
      this.toast.show(`please check your internet connection`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
      this.isNetworkConnected = false;

    } else {
      this.isNetworkConnected = true;

    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

      console.log('network was disconnected :-(');
      this.toast.show(`network was disconnected`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
      this.isNetworkConnected = false;
    });

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.toast.show(`network connected!`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
      this.isNetworkConnected = true;

      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }
}
