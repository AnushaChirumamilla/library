import { BookdetailsPage } from './../bookdetails/bookdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the UserbooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-userbooks',
  templateUrl: 'userbooks.html',
})
export class UserbooksPage {
  Bookss: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserbooksPage');
    this.getData();
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM Books ORDER BY isbn DESC', [])
        .then(res => {
          this.Bookss = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.Bookss.push({ isbn: res.rows.item(i).isbn, name: res.rows.item(i).name, publisheddate: res.rows.item(i).publisheddate, type: res.rows.item(i).type, addeddate: res.rows.item(i).addeddate })
          }
          console.log('bookslist in user' + this.Bookss);
        })
        .catch(e => console.log(e));
    })
  }
  openbookdetails() {
    let Bookdetails = this.modalCtrl.create(BookdetailsPage);
    Bookdetails.present();
  }
}

