import { Injectable } from '@angular/core'; // séparer la logique métier
import { Client } from '../client';
import {AngularFireList ,AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private users = new BehaviorSubject<any[]>([]);
  users$ = this.users.asObservable();

  clientList : AngularFireList<any> 
  
  constructor( private db:AngularFireDatabase) {
    this.clientList = db.list('users');
   }

   createClient( Client: Client) {
    
    this.clientList.push({
    cin: Client.cin ,
    LastName_Name: Client.name ,
    Email: Client.email ,
    password: Client.password,
    lastConnectedDate: Client.lastConnectedDate
    
})

}

getclient() : Observable<any>{
return this.db.list('users').snapshotChanges();
}

getClientById(id:any) : Observable<any>{
  return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
}

searchClient(searchTerm: string): any[] {
  return this.users.value.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
    || client.email.toLowerCase().includes(searchTerm.toLowerCase())
    || client.cin.toLowerCase().includes(searchTerm.toLowerCase())
  );
}


}
