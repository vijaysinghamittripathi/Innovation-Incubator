import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuth  } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { PropertyService } from "../providers/property-service-mock";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryPage } from '../pages/category/category';
import { CategoryService } from '../providers/category-service';
import { InnovationListPage } from '../pages/Innovation-list/Innovation-list';
import { WalkthroughModalPage } from '../pages/popup/popup-modal';
import { InnovationListComponent } from '../components/innovation-list/innovation-list';
import { WordCloudComponent } from '../components/word-cloud/word-cloud.component';
import { InnovationDetailsPage } from '../pages/innovation-details/innovation-details';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { InnovationsService } from '../providers/innovations-service';


export const firebaseConfig = {
  apiKey: 'AIzaSyDGO6GqmbyK6B1PZZJqaS96EPC7dyfv1kg',
  authDomain: 'innovationincubator-a098b.firebaseapp.com',
  databaseURL: 'https://innovationincubator-a098b.firebaseio.com',
  storageBucket: 'innovationincubator-a098b.appspot.com',
  messagingSenderId: '703725005227'
};

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    TutorialPage,
    CategoryPage,
    InnovationListPage,
    WalkthroughModalPage,
    InnovationListComponent,
    InnovationDetailsPage,
    YoutubePipe,
    WordCloudComponent
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
    TutorialPage,
    CategoryPage,
    WalkthroughModalPage,
    InnovationListComponent,
    InnovationDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PropertyService,
    AngularFireAuth, AngularFireDatabase,
    CategoryService, InnovationsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
