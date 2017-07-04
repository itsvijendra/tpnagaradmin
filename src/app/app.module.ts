import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserModule } from "./user/user.module";
import { BannerModule } from "./banner/banner.module";
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DatePickerModule } from 'ng2-datepicker';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { Authentication } from './services/authentication.services';
//import { DatepickerModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavBarComponent,
    LeftMenuComponent,
    LoginComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserModule,
    BannerModule, 
    DatePickerModule,  
    //DatepickerModule.forRoot(),  
    routes
  ],
  providers: [Authentication],
  bootstrap: [AppComponent]
})
export class AppModule { }
