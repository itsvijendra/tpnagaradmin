import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'; 
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
   
  constructor() {
     
   }
   

  ngOnInit() {
    
     
  }
  public get LeftMenu()
  {
    
    return "Menu";
  }
   
}
