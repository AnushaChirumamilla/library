import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = { isbn: "", name: "", publisheddate: "", type: "", addeddate: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
    this.getCurrentData(navParams.get("isbn"));
  }

  getCurrentData(isbn) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM books WHERE isbn=?', [isbn])
        .then(res => {
          console.log('response from table' + JSON.stringify(res));
          if (res.rows.length > 0) {
            this.data.isbn = res.rows.item(0).isbn;
            this.data.name = res.rows.item(0).date;
            this.data.publisheddate = res.rows.item(0).publisheddate;
            this.data.type = res.rows.item(0).type;

            this.data.addeddate = res.rows.item(0).addeddate;

          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE books SET name=?,publisheddate=?,type=?,addeddate=? WHERE isbn=?', [this.data.name, this.data.publisheddate, this.data.type, this.data.addeddate, this.data.isbn])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
