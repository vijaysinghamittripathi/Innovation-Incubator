import {Component, ViewChild } from '@angular/core';
import { CategoryService } from '../../providers/category-service';
import { NavController, Events } from 'ionic-angular';
import { InnovationListPage } from '../Innovation-list/Innovation-list';
import { InnovationsService } from '../../providers/innovations-service';
import { Data } from '../../share/data';
import { WordCloudComponent } from '../../components/word-cloud/word-cloud.component';


@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {

    @ViewChild(WordCloudComponent) cloudComponent: WordCloudComponent;
    private categorydata: Array<any[]>;
    private innovationData: Array<any[]>;
    private innovationdata = [];
    //data = Data;
    constructor(private categoryService: CategoryService, private innovationsService: InnovationsService, 
        public navCtrl: NavController, events:Events) {   
        events.subscribe('selected:category', text => {
            this.categorydata.forEach(item => {
                console.log(item);
                if (item['category_name'] === text) {
                    this.navCtrl.push(InnovationListPage, {
                        item: item
                      });
                }
            });
            console.log(text,'text')
        });
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
            if( this.categorydata.length == this.innovationdata.length) {
                this.innovationdata.sort((a, b) => parseFloat(a.innovationCount) - parseFloat(b.innovationCount));
                this.innovationdata.reverse();
                this.cloudComponent.renderCloud(this.innovationdata);
            }
            
    }

    itemTapped(event, item) {
        this.navCtrl.push(InnovationListPage, {
          item: item
        });
      }

    
}
