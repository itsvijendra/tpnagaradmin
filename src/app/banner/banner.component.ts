import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { BannerServices } from '../services/banner.services';
import { EmitterService } from '../services/emitter.services';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
 
  constructor(private userServices: BannerServices) {
      //let leftmenu = new LeftMenuComponent();
     // leftmenu.setMenu("banner menu")
     
   }
  ngOnInit() {
      
  }
  
}
