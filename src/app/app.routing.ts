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
import { LoginServicesComponent } from './login/login-services/login-services.component';
import { CompanyComponent } from './company/company.component';
import { CityServiceMappingComponent } from './nearbycityservicemapping/city-service-mapping/city-service-mapping.component';
import { NearByCityMappingComponent } from './nearbycityservicemapping/near-by-city-mapping/near-by-city-mapping.component';

const appRoutes: Routes = [

  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'bannermaster', component: AddBannerComponent },
  { path: 'bannerconfigmaster', component: BannerConfigComponent },
  { path: 'bannerconfigdetail', component: BannerConfigDetailComponent },
  { path: 'companyservice', component: CompanyServicesComponent },
  { path: 'companymanagement', component: CompanyComponent },
  { path: 'loginservice', component: LoginServicesComponent },
  { path: 'cityservicemapping', component: CityServiceMappingComponent},
  { path: 'nearbycitymapping', component: NearByCityMappingComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
/**
 *   { path: '', pathMatch: 'full', component: LoginComponent },
 */
export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
