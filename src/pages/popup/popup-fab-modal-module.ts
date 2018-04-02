import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkthroughModalPage } from './popup-modal';

@NgModule({
  declarations: [
    WalkthroughModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkthroughModalPage),
  ],
  exports: [
    WalkthroughModalPage
  ]
})
export class PopupFabModalPageModule {}