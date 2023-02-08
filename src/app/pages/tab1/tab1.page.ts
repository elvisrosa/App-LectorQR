import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barcodeScanner: BarcodeScanner,
    private dataLocal:DatalocalService) {}
  option={
    allowSlidePrev:false,
    allowSlideNext:false
  }

  ionViewDidEnter(){
    this.scan();
  }
  scan(){
      this.barcodeScanner.scan().then(barcodeData=>{
        console.log('Data',barcodeData);
        if(!barcodeData.cancelled){ //Si el usuario no cancela el escaneo
          this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
        }
      }).catch(err=>{
        console.log('error', err)
        this.dataLocal.guardarRegistro('QRCode', 'geo:40.73151796986687, -74.06087294062502');
      })
  }
}
