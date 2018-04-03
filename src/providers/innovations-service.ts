import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InnovationsService {

  private basePath = '/innovations';
  constructor(private db: AngularFireDatabase) {}

  
  getAllInnovations(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }

  /*getInnovationsPerCategory(categoryID) {

     this.getAllInnovations().map((data) => data.json())
     .filter((value) => (value).cat_innovation_id == categoryID)
     .subscribe(val => console.log(val));
    //.filter((data) => data['category_id'] == categoryID)
    //.subscribe(val => console.log(val));
    }*/

    
}
