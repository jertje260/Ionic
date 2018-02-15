import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NfcPage } from '../pages/nfc/nfc';
import { ComponentsModule } from '../components/components.module'
import { CalculatorProvider } from '../providers/calculator/calculator';
import { NFC } from '@ionic-native/nfc';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NfcPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, [CalculatorProvider]),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NfcPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CalculatorProvider,
    NFC
  ]
})
export class AppModule {}
