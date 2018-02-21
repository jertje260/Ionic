import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { Card } from '../../models/card';
import { CardsProvider } from '../../providers/cards/cards';

/**
 * Generated class for the CardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  
  enabled: boolean = false;
  statusString: string = "";
  nfcPossible: boolean = false;
  nfcObserver: any;
  resumeSubscription: any;
  cardReadButtonText: string = "Read NFC Card";
  infoText: string = ""



  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC, 
    private platform: Platform, private cardsProvider: CardsProvider) {
      this.checkNFCEnabled();
  }

  public getCards():Card[]{
    return this.cardsProvider.getCards();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
    this.resumeSubscription = this.platform.resume.subscribe(() => {
      this.checkNFCEnabled();
    });
  }

  ionViewWillUnload() {
    this.resumeSubscription.unsubscribe();
  }

  cardClicked(card: Card) {
    this.navCtrl.push('CardDetailPage', { id: card.id});
  }

  ionViewWillEnter() {

    console.log('entering nfcPage')
    this.checkNFCEnabled();
  }

  checkNFCEnabled(): void {
    this.nfc.enabled()
      .then(output =>
        this.enabledSuccess(output)
      )
      .catch(err =>
        this.enabledFailure(err)
      );
  }

  enabledSuccess(result: any): void {

    console.log(result);
    this.nfcPossible = true;
    this.enabled = true;
    this.statusString = "NFC is enabled, click the button to start scanning."
    this.setDefaultText();
  }

  enabledFailure(result: any): void {
    console.log(result)
    if (result == "cordova_not_available" || result == "NO_NFC") {

      this.statusString = "Not possible to read NFC"
      console.log("cordova is not available, so not possible to read nfc.");
      this.enabled = false;
      this.nfcPossible = false;
    } else if (result == "NFC_DISABLED") {
      this.statusString = "NFC is disabled, go to your settings to turn it on."
      this.nfcPossible = true;
      this.enabled = false;
    }
  }


  readNFCCard(): void {
    this.enabled = false;
    this.cardReadButtonText = "Scanning";
    if (this.platform.is('ios')) {
      this.nfcObserver = this.nfc.beginSession(this.cardReadingSucceeded, this.cardReadingFailed);
      // figure this out later
    }
    this.nfc.addTagDiscoveredListener().subscribe(val => {
      console.log(val);
      this.cardReadingSucceeded(val);
    })

  }

  cardReadingSucceeded(input): void {
    console.log(input);
    this.enabled = true;
    this.setDefaultText();
    this.addCard(input.tag);

  }

  setDefaultText(): void {
    this.cardReadButtonText = "Read NFC Card";
  }

  cardReadingFailed(input): void {
    console.log(input);
    this.enabled = true;
    this.setDefaultText();
  }

  showSettings(): void {
    this.nfc.showSettings()
      .then(output =>
        console.log(output)
        //this.checkNFCEnabled()
      ).catch(err =>
        console.log(err)
      )
  }

  addCard(card: any): void {
    
      var newCard = new Card(card.id, this.getCardTitle(), card.techTypes);
     if(this.cardsProvider.addCard(newCard)){
       console.log("card Added");
     }
     else {
      console.log("Card already exists.");
    }
  }

  getCardTitle(): string {
    var cards = this.getCards();
    if (cards == null) {
      return "Card #1";
    } else {
      return "Card #" + (cards.length + 1);
    }
  }
}