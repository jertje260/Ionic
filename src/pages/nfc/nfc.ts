import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { Storage } from '@ionic/storage';
import { Card } from '../../models/card';

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

  enabled: boolean = false;
  statusString: string = "";
  nfcPossible: boolean = false;
  nfcObserver: any;
  resumeSubscription: any;
  cardReadButtonText: string = "Read NFC Card";
  infoText: string = ""

  cards: Card[] = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC, private platform: Platform, private storage: Storage) {
    storage.get('cards').then((cards) => this.loadCards(cards))

  }

  loadCards(loadedCards: any) {
    this.cards = loadedCards;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NfcPage');
    this.resumeSubscription = this.platform.resume.subscribe(() => {
      this.checkNFCEnabled();
    });
  }

  ionViewWillUnload() {
    this.resumeSubscription.unsubscribe();
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
    this.nfcOutput = JSON.stringify(input);
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
    if (!this.cardExists(card)) {
      var newCard = new Card();
      newCard.title = this.getCardTitle();
      newCard.id = card.id;
      newCard.techtypes = card.techtypes;
      if (this.cards == null) {
        this.cards = [newCard];
      } else {
        this.cards.push(newCard);
      }
      this.saveCards();
    } else {
      console.log("Card already exists.");

    }
  }

  getCardTitle(): string {
    if (this.cards == null) {
      return "Card #1";
    } else {
      return "Card #" + (this.cards.length + 1);
    }


  }

  saveCards(): void {
    this.storage.set("cards", this.cards)
      .then(() => console.log("cards saved"))
      .catch((reason) => {
        console.warn("failed to store cards");
        console.warn(reason);
      });
  }

  cardExists(card: Card): boolean {
    if (this.cards == null) {
      return false;
    }
    for (var i = 0; i < this.cards.length; i++) {
      if (this.idMatches(this.cards[i].id, card.id)) {
        return true;
      }
    }
    return false;
  }

  idMatches(original: number[], test: number[]): boolean {
    if (original.length != test.length) {
      return false;
    }
    for (var i = 0; i < original.length; i++) {
      if (original[i] != test[i]) {
        return false;
      }
    }
    return true;
  }

}
