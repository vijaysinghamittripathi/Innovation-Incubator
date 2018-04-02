import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  private basePath = '/categories';
  constructor(private db: AngularFireDatabase) {}

  
  getCategories(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }
}
