import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup;
  errorMessage: string = '';
  errorMessage1: string = '';

  clientsList: AngularFireList<any>;

  constructor(
    private clientservice: ClientsService,
    public router: Router,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.clientsList = db.list('users');
  }

  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      cin: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(8),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9 A-Za-z]+"),
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
    });
  }

  onSubmit() {
    const cin = this.addClientForm.get('cin').value;
    const name = this.addClientForm.get('name').value;
    const email = this.addClientForm.get('email').value;
    const password = this.addClientForm.get('password').value;

    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const client = { cin: cin, name: name, email: email, password: password};

        const clientRef = this.db.object(`users/${user.uid}`);

        // Mettez à jour l'ID du client avec l'ID généré par Firebase
        clientRef.set(client)
          .then(() => {
            this.router.navigate(['/tables']);
          })
          .catch(error => {
            console.error(error);
            this.errorMessage1 = error.message;
          });
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage = error.message;
      });
  }
}
