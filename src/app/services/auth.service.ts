import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.User | null = null;

  constructor( private auth : AngularFireAuth ,  private router: Router) { 
    this.auth.authState.subscribe((user) => {
      this.user = user;
      });
  }
  getCurrentUser() {
    return this.user;
    }
  signIn(email:string,password:string){
    return new Promise(
      (resolve,reject) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          ()=>{
            console.log("bienvenu..!");
            resolve(true); 
            this.router.navigate(['/tables']);       
          },
          (error) => {
            console.log("erreur..!");
            reject(error);
          }
        );
      }
    );
  }


resetPassword(email:string) {
  return new Promise (
    (resolve,reject) => {
  firebase.auth().sendPasswordResetEmail(email).then(
    () => { 
      resolve (true)
      console.log("we've sent you a password reset link")
    

  },
  (error) => {
    reject(error);
  }
  );

}
  );
}

  }
