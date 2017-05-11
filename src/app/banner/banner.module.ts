import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { BannerComponent } from './banner.component';
import {AddBannerComponent} from './add-banner/add-banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
     BannerComponent,
     AddBannerComponent
  ],
  providers: []

})
export class BannerModule { }
