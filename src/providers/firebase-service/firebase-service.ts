import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase,
    private alertCtrl: AlertController) {}

    addProduct(name){
      let product = firebase.database()
                    .ref('/Productlist')
                    .orderByChild('text')
                    .equalTo(name.text);
      product.once('value', (data)=>{
        if(!data.val()){
            let alert = this.alertCtrl.create({
                title: 'New Product',
                subTitle: 'successfully added!',
                buttons: ['Dismiss']
              });
              alert.present();
          this.afd.list('/Productlist/').push(name);
        }
      })
    }
}
