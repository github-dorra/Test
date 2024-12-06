import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser , GoogleLoginProvider } from "angularx-social-login";


declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false;
  loginform!: FormGroup ;

  user:SocialUser ;
  loggedIn: boolean = false;

  constructor(private fb: FormBuilder , private authservice: AuthService , private router: Router,
                private authService1: SocialAuthService ){}


  ngOnInit(): void {
    this.initform(),
    this.onSubmit(),

    this.authService1.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      
    })


  }

  onSignInGoogle(): void {
    gapi.auth2.getAuthInstance().signIn().then((googleUser: any) => {
      console.log(googleUser);
      this.loggedIn = (googleUser != null);
      if (this.loggedIn) {
        // Redirect the user to your desired page
        this.router.navigate(['/reset']);
      }
    }).catch((error:any) => {
      if (error.error === 'popup_closed_by_user') {
        console.log('User closed the Google sign-in popup window. Please try again.');
        // Display an error message to the user
      } else {
        console.log('Error occurred during Google sign-in:', error);
        // Display an error message to the user
      }
    });
  }
  
    


  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '765548568655-eji5g89297lnlom5299j1ub8610hvgoi.apps.googleusercontent.com',
        scope: 'email'
      });
    });
  }
  


  signOutWithGoogle(): void {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('User signed out');
      this.loggedIn = false;
    }, (error: any) => {
      console.log(error);
    });
  }



 initform(){
  this.loginform=this.fb.group({
   email: new FormControl('',[
   Validators.required, Validators.email]),
   password: new FormControl('',[
    Validators.required, Validators.minLength(6)]),
  })
 }
 get email(){
  return this.loginform.get('email');
}

get password(){
  return this.loginform.get('password');
}
onDashboardLinkClick() {

    alert('Please authenticate first..!');}

    onSubmit() {
      if (this.loginform.invalid) {
        return;
      }
    
      const email = this.email?.value;
      const password = this.password?.value;
        
      if (email && password) {
        if (this.rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        this.authservice.signIn(email, password)
          .then(() => {
            this.router.navigate(['/tables']);
          })
          .catch((error) => {
            alert('An error occurred: please verify your email or password!');
          });
      } else {
        // Retrieve credentials from local storage
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
          this.authservice.signIn(savedEmail, savedPassword)
            .then(() => {
              this.router.navigate(['/tables']);
            })
            .catch((error) => {
              alert('An error occurred: please verify your email or password!');
            });
        }
      }
    }
    


    
  }
