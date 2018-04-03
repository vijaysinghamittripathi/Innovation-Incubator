import {Component} from '@angular/core';
import { CategoryService } from '../../providers/category-service';
import { NavController } from 'ionic-angular';
import { InnovationListPage } from '../Innovation-list/Innovation-list';


@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {

    private categorydata: Array<any[]>;
    constructor(private categoryService: CategoryService, public navCtrl: NavController) {
        this.getCategories();
    }

    getCategories() {
         this.categoryService.getCategories()
        .subscribe(data => this.categorydata = data);
    }

    itemTapped(event, item) {
        this.navCtrl.push(InnovationListPage, {
          item: item
        });
      }

}
