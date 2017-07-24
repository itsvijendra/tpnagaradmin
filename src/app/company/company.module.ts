import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { CompanyServicesComponent } from './company-services/company-services.component';
import { ContentHeaders } from '../common/contentheaders';
import { DatePickerModule } from 'ng2-datepicker';
import { CompanyService } from '../services/company.services';
import { CompanyComponent } from './company.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DatePickerModule
  ],
  declarations: [
     CompanyServicesComponent,
     CompanyComponent
  ],
  exports: [
    CompanyServicesComponent,
    CompanyComponent
  ],
  providers: [ 
     CompanyService,ContentHeaders
   ]
})
export class CompanyModule { }
