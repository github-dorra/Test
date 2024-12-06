import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, DatabaseSnapshot } from '@angular/fire/compat/database';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ClientsService } from '../services/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import 'firebase/compat/database';
import { MaskPasswordPipe } from '../pipes/mask-password.pipe';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-tab-client',
  templateUrl: './tab-client.component.html',
  styleUrls: ['./tab-client.component.css'],
  providers: [MaskPasswordPipe]
})
export class TabClientComponent implements OnInit {  //cycle de vie du framwork ang

  searchTerm: string = '';
  displayUpdate: boolean = false;
  id: any;
  errorMessage: string = '';
  errorMessage1: string = '';
  cin: string;
  status: string;
  email: string;
  name: string;
  password: string;
  userforupdate: AngularFireList<any>;
  data = {
    cin: '',
    name: '',
    email: '',
    password: '',
    connected: '',
  };
  id1: any;
  userfordelete: AngularFireList<any>;
  listclient: Client[] = [];
  clientList: AngularFireList<any>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private firebase: AngularFireDatabase,
    private clientService: ClientsService,
    private db: AngularFireDatabase,
    private fire: AngularFireAuth
  ) {
    this.clientList = db.list('users');
    this.userfordelete = this.firebase.list('users');
    this.route.params.subscribe((params) => {
      this.id = params;
    });
    this.userforupdate = this.firebase.list('users');
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1);
  }

  ngOnInit(): void {
    this.clientService.getclient().subscribe((results) => {
      this.listclient1(results);
    });

    this.clientList = this.db.list('users');
    this.clientList
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            uid: c.payload.key, // Ajout de la propriété uid
            ...c.payload.val(),
          }))
        )
      )
      .subscribe((data) => {
        this.listclient = data;

        this.fire.authState.subscribe((user) => {
          if (user) {
            const email = user.email;
            const client = this.listclient.find((item) => item.email === email);
            if (client) {
              this.clientList.update(client.$key, { connected: new Date().toLocaleString() });
            }
          }
        });
      });

    this.fire.authState.subscribe((user) => {
      if (user) {
        const email = user.email;
      }
    });
  }

  onSubmit() {
    this.clientList
      .push({
        cin: this.cin,
        name: this.name,
        email: this.email,
        password: this.password,
        id: this.id,
      })
      .then((added) => {
        this.router.navigate(['/tab_client']);
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage1 = error.message;
        console.log('error', error);
        console.log(error.message);
      });
  }

  GoToAddClient(): void {
    this.router.navigate(['/add_client']);
  }

  listclient1(entries: any[]) {
    this.listclient = [];
    entries.forEach((element) => {
      let y = element.payload.toJSON();
      y['$key'] = element.key;
      y['uid'] = element.key; // Ajout de la propriété uid
      this.listclient.push(y as Client);
    });
    console.log(this.listclient);
  }

  openDialog(key: FirebaseOperation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure to delete this information?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userfordelete.remove(key);
      }
    });
  }
}
