import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsProvider {

  cards: Card[];

  constructor(private storage: Storage) {
    console.log('Hello CardsProvider Provider');

    this.loadCards();


  }

  public addOrUpdateCard(card:Card):void{
    var oldCard = this.cards.find(c=> c.id == card.id);
    if(oldCard != null){
      var index = this.cards.indexOf(oldCard);
      if(index>-1){
        this.cards.splice(index,1);
      }
    }
    this.cards.push(card);
    this.saveCards();

  }

  loadCards(): void {
    this.storage.get('cards')
      .then((cards) => {
        if (cards == null) {
          this.cards = new Array<Card>();
        } else {
          this.cards = cards;
        }
      })
      .catch((err) => {
        console.warn(err);
        this.cards = new Array<Card>();
      });
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public addCard(c: Card): boolean {
    if (!this.cardExists(c)) {
      if (this.cards == null) {
        this.cards = [c];
      } else {
        this.cards.push(c);
      }
      this.saveCards();
      return true;
    }
    return false;
  }

  public getCardById(id:any):Card{
    return this.cards.find(c => c.id == id);
  }

  public cardExists(c: Card): boolean {
    if (this.cards == null) {
      return false;
    }
    for (var i = 0; i < this.cards.length; i++) {
      if (this.idMatches(this.cards[i].id, c.id)) {
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

  saveCards(): void {
    this.storage.set("cards", this.cards)
      .then(() => console.log("cards saved"))
      .catch((reason) => {
        console.warn("failed to store cards");
        console.warn(reason);
      });
  }

}
