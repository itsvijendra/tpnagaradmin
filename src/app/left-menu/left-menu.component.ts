import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'; 
import { Authentication } from '../services/authentication.services'; 
import { User } from 'app/model/user';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  private user: User;
  private NearByCityMappingAccess:boolean = false;
  private BannerConfigurationAccess:boolean = false;
  private CityServiceMappingAccess: boolean = false;
  constructor(private auth: Authentication) {
     
   }
   

  ngOnInit() {
    
    if(localStorage.getItem('currentuser') != null)
    {
      this.user = JSON.parse(localStorage.getItem('currentuser'));
      var indx = this.user.userAccess.findIndex(x => x.PermissionName == 'NearByCityMapping');
      if(indx >= 0) this.NearByCityMappingAccess = true; 
      var indx = this.user.userAccess.findIndex(x => x.PermissionName == 'BannerConfiguration');
      if(indx >= 0) this.BannerConfigurationAccess = true; 
      var indx = this.user.userAccess.findIndex(x => x.PermissionName == 'CityServiceMapping');
      if(indx >= 0) this.CityServiceMappingAccess = true;             
    }       
  }
  LogOut()
  {
    this.auth.logout();
  }
  public get LeftMenu()
  {
    
    return "Menu";
  }
   
}
