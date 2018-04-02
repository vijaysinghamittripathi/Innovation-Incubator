import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

//import { Storage } from '@ionic/storage';



import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController
  ) { }

  startApp() {
   /* this.navCtrl.push(WelcomePage).then(() => {
      //this.storage.set('hasSeenTutorial', 'true');
    })*/
    this.navCtrl.setRoot(CategoryPage);
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menu.enable(true);
  }

}
