import {Component} from '@angular/core';
import {Config, NavController, ModalController, NavParams} from 'ionic-angular';


import { WalkthroughModalPage } from '../popup/popup-modal';
import { Content, Innovation, Team } from '../../models/innovation';
import { InnovationDetailsPage } from '../innovation-details/innovation-details';
import { InnovationsService } from '../../providers/innovations-service';

@Component({
    selector: 'page-innovation-list',
    templateUrl: 'Innovation-list.html'
})
export class InnovationListPage {

    public innovationdata: Innovation[];
    public categorydata;

    constructor(public navCtrl: NavController, public config: Config,
        public modalCtrl: ModalController, public navParams: NavParams, public innovationsService: InnovationsService) {
    }

    ionViewWillLoad() {
        this.categorydata = this.navParams.get('item');
        let selectedCategory = this.categorydata.category_id;
        this.getInnovationsPerCategory(selectedCategory);
    }

    getInnovationsPerCategory(categoryID) {
        let innovation = this.innovationsService.getAllInnovations();

        innovation.subscribe((_items)=> {
            this.innovationdata = [];
            _items.forEach(item => {
                if( item.cat_innovation_id == categoryID) {
                    this.innovationdata.push(item as Innovation);
                } 
            })
        }); 
    }


    openWalkthroughModal() {
       this.openModal();
    }

    openModal() {
        this.modalCtrl.create(WalkthroughModalPage, null, { cssClass: 'inset-modal' })
                      .present();
    }
    

    public navigateToDetails(innovation: Innovation) {
        this.navCtrl.push(InnovationDetailsPage, {
            selectedInnovation: innovation,
            innovationList: this.innovationdata
        });
    }

}
