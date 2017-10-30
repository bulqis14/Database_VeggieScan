import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase, private alertCtrl: AlertController) {
}
    getProduct() {
      return this.afd.list('/Productlist/');
    }

    getProductId(id){
      console.log(id)
      return this.afd.list('/Productlist', {
        query: {
          orderByChild: "text",
          equalTo: id
        }
      })

    }

    addProduct(name){
      let product = firebase.database()
                    .ref('/Productlist')
                    .orderByChild('text')
                    .equalTo(name.text);
      product.once('value', (data)=>{
        if(!data.val()){
          // console.log('tidak ada product')
            let alert = this.alertCtrl.create({
                title: 'New Product',
                subTitle: 'successfully added!',
                buttons: ['Dismiss']
              });
              alert.present();
          this.afd.list('/Productlist/').push(name);
        }
      })
      //this.afd.list('/Productlist/').push(name);
    }

    removeProduct(id){
      this.afd.list('/Productlist/').remove(id);
    }

    addHistory(data){
      this.afd.list('/history').push(data);
    }

    getHistory(){
      return this.afd.list('/history', {
        query: {
          limitToLast: 5
        }
      })
    }


}
