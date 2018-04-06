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


    
}
