import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardsPage } from './cards';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from 'ionic-angular';


@NgModule({
  declarations: [
    CardsPage,
  ],
  imports: [
    IonicPageModule.forChild(CardsPage),
    NFC,
    IonicStorageModule.forRoot(),
    IonicModule,
  ],
})
export class CardsPageModule {}
