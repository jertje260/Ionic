import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { CardsProvider } from '../../providers/cards/cards';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CardDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html',
})
export class CardDetailPage {

  cardId: any;
  cardForm: FormGroup;
  //cardTitle:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cardsProvider: CardsProvider,
    private formBuilder: FormBuilder
  ) {
    this.cardId = navParams.get('id');
    this.cardForm = this.formBuilder.group({
      cardTitle: [this.getCard().title, Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardDetailPage');
  }

  public getCard(): Card {
    return this.cardsProvider.getCardById(this.cardId);
  }

  public saveChanges() {
    if (this.cardForm.valid) {
      var c = this.getCard();
      c.title = this.cardForm.controls.cardTitle.value;

      this.cardsProvider.addOrUpdateCard(c);
      this.navCtrl.pop();

    }
  }



}
