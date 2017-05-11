import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  theHtmlString: Observable<string>;
  constructor() {  }

  ngOnInit() {
     
  }
  setMenu(innerHtml)
  {
    this.theHtmlString.subscribe(value=> "innerHtml");
  }
}
