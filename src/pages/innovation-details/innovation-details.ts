import { Component, ViewChild } from '@angular/core';
import { Content, NavParams } from 'ionic-angular';
import { Innovation } from '../../models/innovation';

@Component({
  selector: 'page-innovation-details',
  templateUrl: 'innovation-details.html',
})
export class InnovationDetailsPage {
    @ViewChild(Content) content: Content;
    public innovationList: Innovation[] = [];
    public innovation: Innovation;

    constructor(public navParams: NavParams) {}

    ionViewWillLoad() {
        this.innovationList = this.navParams.get('innovationList') as Innovation[];
        this.innovation = this.navParams.get('selectedInnovation') as Innovation;
    }

    public loadInnovationDetails(innovation: Innovation) {
        this.innovation =  innovation;
        this.content.scrollToTop(500);
    }
}
