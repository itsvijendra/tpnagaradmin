import { Component , OnInit} from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { User } from './model/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  date: DateModel;
  options: DatePickerOptions;
  user: User;
  isLoginRequired = true;
  title = 'app works!!';
 
  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.options = new DatePickerOptions();    
  }
  ngOnInit()
  {
    this.user = localStorage.getItem('currentuser')
    //alert(this.user);
    if(this.user != null)
    {
       this.router.navigate(['home']);
       this.isLoginRequired = false;
    }
    else
    {
      this.isLoginRequired = true;
    }
  }
   
}
