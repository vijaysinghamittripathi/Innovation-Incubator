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
    public innovationContentType: String;

    constructor(public navParams: NavParams) {}

    ionViewWillLoad() {
        this.innovationList = this.navParams.get('innovationList') as Innovation[];
        this.innovation = this.navParams.get('selectedInnovation') as Innovation;
        if(this.innovation.content != undefined && this.innovation.content != null) {
            this.innovationContentType = this.innovation.content.type
        }
        else {
            this.innovationContentType = ''
        }
       
    }

    public loadInnovationDetails(innovation: Innovation) {
        this.innovation =  innovation;
        if(this.innovation.content != undefined && this.innovation.content != null) {
            this.innovationContentType = this.innovation.content.type
        }
        else {
            this.innovationContentType = ''
        }
        this.content.scrollToTop(500);
    }
}
