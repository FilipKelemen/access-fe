import { Injectable } from '@angular/core';
import {IDBPDatabase,openDB} from 'idb'
import {AccessDB} from '../models/schemas'
import {Database} from '../models/supabase'

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {

  database!: IDBPDatabase<AccessDB>
  constructor() {
    this.initDb()
  }

  private async initDb() {
    this.database = await openDB<AccessDB>('access', 1, {
      upgrade(db) {
        db.createObjectStore('Role', {keyPath: 'id'});
        db.createObjectStore('Access', {keyPath: 'id'});
        db.createObjectStore('Employee', {keyPath: 'IMEI',});
      },
    });
  }

  async cacheEmployees(supabaseEmployees: Array<Database['public']['Tables']['Employee']['Row']> | null) {
    if(supabaseEmployees) {
      const tx = this.database.transaction('Employee', 'readwrite');
      await Promise.all([
        ...supabaseEmployees.map((supabaseEmployee) =>
          tx.store.put({...supabaseEmployee})
        ),
        tx.done,
      ]);
    }
  }

  async getEmployees() {
    return this.database.getAll('Employee')
  }

}


