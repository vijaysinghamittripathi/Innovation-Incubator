import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Innovation } from '../../models/innovation';

@Component({
  selector: 'page-innovation-details',
  templateUrl: 'innovation-details.html',
})
export class InnovationDetailsPage {
    public innovationList: Innovation[] = [];
    public innovation: Innovation;

    constructor(public navParams: NavParams) {}

    ionViewWillLoad() {
        this.innovationList = this.navParams.get('innovationList') as Innovation[];
        this.innovation = this.navParams.get('selectedInnovation') as Innovation;
    }

    public loadInnovationDetails(innovation: Innovation) {
        this.innovation =  innovation;
    }
}
