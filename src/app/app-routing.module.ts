import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabClientComponent } from './tab-client/tab-client.component';
import { LoginComponent } from './login/login.component';
import { TablesComponent } from './tables/tables.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { Page404Component } from './page404/page404.component';






const routes: Routes = [
{path:'' , component:LoginComponent, pathMatch: 'full'},  
{path:'client' , component:TabClientComponent},
{path:'tables' ,component:TablesComponent},
{path:'reset' , component:RestPasswordComponent},
{path:'add_client', component: AddClientComponent},
{path:'update/:id' , component: UpdateClientComponent},
 {path:'confirmdialog', component: ConfirmationDialogComponent},
 {path:'**' , component:Page404Component},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
