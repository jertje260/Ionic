import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import "rxjs/add/operator/toPromise";

/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {

  enabled:boolean = false;
  statusString:string = "";
  nfcPossible:boolean = false;
  nfcObserver:any;
  resumeSubscription:any;
  cardReadButtonText:string = "Read NFC Card";
  nfcOutput:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NfcPage');

  this.resumeSubscription=this.platform.resume.subscribe(() => {      
    this.checkNFCEnabled();
  });
  }
  
  ionViewWillUnload() {
      this.resumeSubscription.unsubscribe();
    }


  ionViewWillEnter(){
    console.log('entering nfcPage')
    this.checkNFCEnabled();
  }

  checkNFCEnabled(){
    this.nfc.enabled()
    .then(output => 
      this.enabledSuccess(output)
    )
    .catch(err => 
      this.enabledFailure(err)
    );
  }

  enabledSuccess(result:any){
    console.log(result);
    this.nfcPossible = true;
    this.enabled = true;
    this.statusString = "NFC is enabled, click the button to start scanning."
    this.setDefaultText();
  }

  enabledFailure(result: any){
    console.log(result)
    if(result == "cordova_not_available" || result == "NO_NFC"){
      this.statusString = "Not possible to read NFC"
      console.log("cordova is not available, so not possible to read nfc.");
      this.enabled = false;
      this.nfcPossible = false;
    } else if(result == "NFC_DISABLED"){
      this.statusString = "NFC is disabled, go to your settings to turn it on."
      this.nfcPossible = true;
      this.enabled = false;
    }
  }

  readNFCCard(){
    this.enabled = false;
    this.cardReadButtonText = "Scanning";
    if(this.platform.is('ios')){
      this.nfcObserver = this.nfc.beginSession(this.cardReadingSucceeded, this.cardReadingFailed); 
      // figure this out later
    }else{
      this.nfc.addTagDiscoveredListener().subscribe(val=>{
        console.log(val);
        this.cardReadingSucceeded(val);
      })
    }
  }

  cardReadingSucceeded(input){
    console.log(input);
    console.log(this.nfcObserver);
    this.enabled = true;
    this.setDefaultText();
    this.nfcOutput = JSON.stringify(input);
  }

  setDefaultText(){
    this.cardReadButtonText = "Read NFC Card";
  }
  cardReadingFailed(input){
    console.log(input);
    this.enabled = true;
    this.setDefaultText();
  }

  showSettings(){
    this.nfc.showSettings()
    .then(output =>
      console.log(output)
      //this.checkNFCEnabled()
    ).catch(err =>
      console.log(err)
    )
  }


}
