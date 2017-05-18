import { Component, OnInit,ViewChild } from '@angular/core';
import {DatePickerComponent} from 'ng2-date-picker';
 
@Component({
  selector: 'app-datepicker',
  template: `<div>
    <h1>Container</h1>    
    <button (click)="open()"></button>
    <button (click)="close()"></button>
  </div>`,
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
@ViewChild('dayPicker') dayPicker:DatePickerComponent;
  constructor() { }

  ngOnInit() {
  }
  open() {
        this.dayPicker.api.open();
    }
     
    close() {
         this.dayPicker.api.close();
    } 
}
