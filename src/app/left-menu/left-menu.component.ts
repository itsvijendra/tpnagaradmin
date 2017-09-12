import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'; 
import { Authentication } from '../services/authentication.services'; 
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
   
  constructor(private auth: Authentication) {
     
   }
   

  ngOnInit() {
    
     
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
