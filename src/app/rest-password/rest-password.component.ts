import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {
 email:string;
 
  constructor(private authservice:AuthService,private router:Router , private auth:AngularFireAuth) {
    this.email = '';
   }

  ngOnInit(): void {
  }
  resetPassword() {
    if (!this.email) {
      alert('Email address is missing.');
      return;
    }
    
    this.authservice.resetPassword(this.email)
      .then(() => {
        alert('Password reset email sent successfully.');
      })
      .catch((error) => {
        alert('Error sending password reset email:');
      });
  }

  


}
