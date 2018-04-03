import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuth  } from 'angularfire2/auth';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import { TutorialPage } from '../pages/tutorial/tutorial';
import {PropertyService} from "../providers/property-service-mock";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryPage } from '../pages/category/category';
import { CategoryService } from '../providers/category-service';
import { InnovationListPage } from '../pages/Innovation-list/Innovation-list';
import { WalkthroughModalPage } from '../pages/popup/popup-modal';
import { InnovationListComponent } from '../components/innovation-list/innovation-list';


export const firebaseConfig = {
  apiKey: 'AIzaSyA2h8-EqMIdg2JQazC-O3E-C6BwYFnzJIU',
  authDomain: 'ngfbauth-6d5b0.firebaseapp.com',
  databaseURL: 'https://ngfbauth-6d5b0.firebaseio.com',
  storageBucket: 'ngfbauth-6d5b0.appspot.com',
  messagingSenderId: '769768187112'
};

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    PropertyDetailPage,
    TutorialPage,
    CategoryPage,
    InnovationListPage,
    WalkthroughModalPage,
    InnovationListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    InnovationListPage,
    PropertyDetailPage,
    TutorialPage,
    CategoryPage,
    WalkthroughModalPage,
    InnovationListComponent,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    PropertyService,
    AngularFireAuth, AngularFireDatabase,
    CategoryService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
