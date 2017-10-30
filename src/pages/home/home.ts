import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { FirebaseListObservable} from 'angularfire2/database';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Product: FirebaseListObservable<any[]>;
  newProduct = '';

  constructor(public navCtrl: NavController, public FbS: FirebaseServiceProvider, private barcodeScanner: BarcodeScanner) {
    this.Product = this.FbS.getProduct();
  }

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // console.log('test');

      // if([0]. == barcodeData.text)
      //   barcodeData.cancelled = true;
      // console.log(this.Product);

      if(!barcodeData.cancelled){
        this.FbS.addProduct(barcodeData);
      }
    }, (err) => {
      // An error occurred
    });
  }

  addProduct() {
    console.log(this.newProduct);
    this.FbS.addProduct(this.newProduct);
  }

  removeProduct(id) {
    this.FbS.removeProduct(id);

  }
}
