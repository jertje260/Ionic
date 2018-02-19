import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfcPage } from './nfc';
import { NFC } from '@ionic-native/nfc';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    NfcPage,
  ],
  imports: [
    IonicPageModule.forChild(NfcPage),
    NFC,
    IonicStorageModule.forRoot()
  ],
})
export class NfcPageModule {}
