import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-walkthrough-modal',
  templateUrl: 'walkthrough-modal.html'
})
export class WalkthroughModalPage {


  constructor(public viewCtrl: ViewController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}