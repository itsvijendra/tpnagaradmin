import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { BannerComponent } from './banner.component';
import {AddBannerComponent} from './add-banner/add-banner.component';
import { BannerServices } from '../services/banner.services';
import { BannerConfigComponent } from '../banner/banner-config/banner-config.component';
import { BannerConfigDetailComponent } from './banner-config-detail/banner-config-detail.component';
import { ContentHeaders } from '../common/contentheaders';
import { DatePickerModule } from 'ng2-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DatePickerModule
  ],
  declarations: [
     BannerComponent,
     AddBannerComponent,
     BannerConfigComponent,
     BannerConfigDetailComponent
  ],
  exports: [
    BannerComponent
  ],
  providers: [ 
     BannerServices,ContentHeaders
   ]
})
export class BannerModule { }
