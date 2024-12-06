import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { LoginComponent } from './login/login.component';
import { MaskPasswordPipe } from './pipes/mask-password.pipe';
import { TabClientComponent } from './tab-client/tab-client.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import {StyleClassModule} from 'primeng/styleclass';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//import materiel de la template argon 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.development';
import { MatDialogModule } from '@angular/material/dialog';
//import firebase modules
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule }  from '@angular/fire/compat';
import { AngularFireDatabaseModule  } from '@angular/fire/compat/database';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
//google 
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import {HttpClientModule} from '@angular/common/http' ;

/*const config = new SocialAuthServiceConfig ([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('765548568655-cl1d107mb7i3jjdeq9pso60refjggv9l.apps.googleusercontent.com')
  }
]);*/

import { Page404Component } from './page404/page404.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabClientComponent,
    TablesComponent,
    RestPasswordComponent,
    AddClientComponent,
    ConfirmationDialogComponent,
    UpdateClientComponent,
    
    MaskPasswordPipe,
    Page404Component,
  
    
     
     
        
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule ,
    ButtonModule, StyleClassModule, RippleModule,CheckboxModule,
    MatDialogModule,
    MatInputModule, MatButtonModule,MatIconModule,
  
    AngularFireAuthModule,
    AngularFireModule. initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    
    SocialLoginModule, HttpClientModule, 
    
  ],

  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '765548568655-eji5g89297lnlom5299j1ub8610hvgoi.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
   }],
   
      bootstrap: [AppComponent]
  
})
export class AppModule { }
