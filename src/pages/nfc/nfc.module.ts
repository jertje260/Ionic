import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfcPage } from './nfc';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    NfcPage,
  ],
  imports: [
    IonicPageModule.forChild(NfcPage),
    NFC,
    IonicStorageModule.forRoot(),
    IonicModule
  ],
})
export class NfcPageModule {}
