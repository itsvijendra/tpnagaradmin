import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
 
  constructor() {
      let leftmenu = new LeftMenuComponent();
      leftmenu.setMenu("banner menu")
   }
  ngOnInit() {
      
  }
  
}
