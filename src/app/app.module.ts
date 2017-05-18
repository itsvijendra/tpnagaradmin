import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserModule } from "./user/user.module";
import { BannerModule } from "./banner/banner.module";
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import {DpDatePickerModule} from 'ng2-date-picker';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavBarComponent,
    LeftMenuComponent,
    DatepickerComponent,      
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UserModule,
    BannerModule,  
    DpDatePickerModule, 
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
