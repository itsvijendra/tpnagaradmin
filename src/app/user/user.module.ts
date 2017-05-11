import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserServices } from '../services/user.services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    UserComponent,
    AddUserComponent
  ],
   providers: [
    UserServices
  ]
})
export class UserModule { }
