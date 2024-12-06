import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AuthService} from '../services/auth.service';
import firebase from 'firebase/compat/app';
import { ClientsService } from '../services/clients.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit  {  //utiliser le cycle de vie de framwork angular

 
  searchTerm: string;

  usersRef: AngularFireList<any>;
  users: Observable<Client[]>;
  dorra : Client[] =[] ;

  adminName: string = ' Administrator account';
  adminEmail: string = ''; 
  showMenu: boolean = false;
   
    listclient: Client[] = [];

    displayAdd: boolean = false;


    clientList: AngularFireList<any>



   constructor( private router:Router,private route: ActivatedRoute ,
    private AuthService: AuthService, private db:AngularFireDatabase ,
    private fire:AngularFireAuth , private clientService : ClientsService){
      this.clientList = db.list('users');

      this.usersRef = db.list('/users');
    this.users = this.usersRef.snapshotChanges().pipe(   //observable retourne les modifications apportées de firebase 
      map(changes => 
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );
      
      
    }  // appler automatiquenment une fois lorsque on initialise le code 
      ngOnInit(): void {
        this.clientService.getclient().subscribe((clients: Client[]) => { //recuperer la liste des client de firebase puis l'associer a dorra et l'afficher
          this.dorra = clients;
        });
      }



      toggleMenu() {
        this.showMenu = !this.showMenu;
        if (this.adminEmail === '') {
          this.fire.authState.subscribe((user) => {
            if (user) {
              this.adminEmail = user.email;
              this.db.object(`/users/${user.uid}`).valueChanges().subscribe((userData: any) => {
                this.adminName = userData.name;
              });
            }
          });
        }
      }
      

     navigateToLogin(): void {
      this.router.navigate(['/']);
    }

    logout() {
      return firebase.auth().signOut().then(added=>{
        this.router.navigate(['/']);
      });
     
  }



}

