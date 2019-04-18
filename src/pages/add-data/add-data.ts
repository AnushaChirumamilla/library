import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation'


@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  lat: number;
  longt: number;
  data = { name: "", publisheddate: "", type: "", addeddate: "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast, private geolocation: Geolocation) { }

  saveData() {


    let query = "insert into books(name,publisheddate,type,addeddate)" +
      "values('" + this.data.name + "','" + this.data.publisheddate + "','" + this.data.type + "','" + this.data.addeddate + "');";
    console.log('query' + query);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(query, [])
        .then(res => {

          this.toast.show(`Added Succesfully`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          this.navCtrl.push(HomePage);

        })
        .catch(e => {
          console.log('notinserted' + JSON.stringify(e));

        });
    }).catch(e => {
      console.log('not success' + e);


    });
  }
  getlocation() {
    var options = {
      timeout: 5000
    }

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.lat = (resp.coords.latitude);
      this.longt = (resp.coords.longitude);
      console.log('location of user' + this.lat);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
