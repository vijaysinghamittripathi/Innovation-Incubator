import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';


import {WelcomePage} from '../pages/welcome/welcome';

import { PropertyService } from '../providers/property-service-mock';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { InnovationListPage } from '../pages/Innovation-list/Innovation-list';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TutorialPage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    contactMenuItems: Array<MenuItem>;

    
    

    events:Events;

    constructor(public platform: Platform, public statusBar: StatusBar, 
        public splashScreen: SplashScreen, events:Events, public propertyService: PropertyService, public menu: MenuController) {



        this.appMenuItems = [
            {title: 'Properties', component: InnovationListPage, icon: 'home'},
            
        ];

        this.helpMenuItems = [
            {title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
            
        ];

      

        events.subscribe('username:changed', username => {
            if(username !== undefined && username !== ""){
                this.accountMenuItems[0].title = username;
                this.propertyService.resetFavoritesForNewUser();
            }
         })

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
        this.menu.enable(false);
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
       

    }
}
