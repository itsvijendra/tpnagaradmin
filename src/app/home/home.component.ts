import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: DateModel;
  options: DatePickerOptions;
  constructor() { 
    this.options = new DatePickerOptions(); 
  }

  ngOnInit() {
  }

}
