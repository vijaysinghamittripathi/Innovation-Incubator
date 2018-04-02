import {Component} from '@angular/core';
import { CategoryService } from '../../providers/category-service';


@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {

    private categorydata: Array<any[]>;
    constructor(private categoryService: CategoryService) {
        this.getCategories();
    }

    getCategories() {
         this.categoryService.getCategories()
        .subscribe(data => this.categorydata = data);
    }

}
