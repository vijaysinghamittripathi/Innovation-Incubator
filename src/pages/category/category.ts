import {Component} from '@angular/core';
import { CategoryService } from '../../providers/category-service';
import { NavController } from 'ionic-angular';
import { InnovationListPage } from '../Innovation-list/Innovation-list';
import { InnovationsService } from '../../providers/innovations-service';


@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {

    private categorydata: Array<any[]>;
    private innovationData: Array<any[]>;
    private innovationdata = [];
    constructor(private categoryService: CategoryService, private innovationsService: InnovationsService, public navCtrl: NavController) {
        this.getInnovations();
        
    }

    getCategories() {
         this.categoryService.getCategories()
         .subscribe(data => {
             this.categorydata = data;
             this.categorydata.forEach(item => {
                this.getInnovationsCountPerCategory(item);
            });
             
         });
       
        
    }
    getInnovations() {
       this.innovationsService.getAllInnovations().subscribe(data => {
           this.innovationData = data;
           this.getCategories();
        }); 
    }

    getInnovationsCountPerCategory(categoryItem) {
         
       let nCount: number = 0;
       this.innovationData.forEach(item => {
                if( item['cat_innovation_id'] == categoryItem.category_id) {
                    nCount++;
                } 
            });
            let catObj = {
                innovationCount: nCount,
                categoryObject: categoryItem
            };
            this.innovationdata.push(catObj);
        
    }

    itemTapped(event, item) {
        this.navCtrl.push(InnovationListPage, {
          item: item
        });
      }

}
