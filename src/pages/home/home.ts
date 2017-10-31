import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public FbS: FirebaseServiceProvider,
    private barcodeScanner: BarcodeScanner) {}

  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      if(!barcodeData.cancelled){
        this.FbS.addProduct(barcodeData);
      }
    }, (err) => {
      // An error occurred
    });
  }

}
