import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component'; 
import { UserComponent } from './user/user.component'; 
import {AddBannerComponent} from './banner/add-banner/add-banner.component';
import { BannerConfigComponent } from './banner/banner-config/banner-config.component';
import { BannerConfigDetailComponent } from './banner/banner-config-detail/banner-config-detail.component';
import { LoginComponent } from './login/login.component';
import { CompanyServicesComponent } from './company/company-services/company-services.component';
const appRoutes: Routes = [

  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'bannermaster', component: AddBannerComponent },
  { path: 'bannerconfigmaster', component: BannerConfigComponent },
  { path: 'bannerconfigdetail', component: BannerConfigDetailComponent },
  { path: 'companyservice', component: CompanyServicesComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
/**
 *   { path: '', pathMatch: 'full', component: LoginComponent },
 */
export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
