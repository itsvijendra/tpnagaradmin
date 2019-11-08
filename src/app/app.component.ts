import { Component , OnInit} from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { User } from './model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Authentication } from './services/authentication.services';

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
  currentUser: User;
  constructor(private router: Router,
    private route: ActivatedRoute,private authenticationService: Authentication) {
    this.options = new DatePickerOptions();  
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);  
  }
  ngOnInit()
  {
    console.log(JSON.stringify(this.currentUser));
    if(!(this.currentUser && this.currentUser.IsValidUser))
    {
      this.router.navigateByUrl('');
    }
    else
    {
      this.currentUser.getUserPermissions = false;
      this.authenticationService.login(this.currentUser).subscribe(
          response => {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
          },
            error=>  { 
              this.authenticationService.logout();
          }
        );  
    }
    /*if(localStorage.getItem('currentuser') != null)
    {
      this.user = JSON.parse(localStorage.getItem('currentuser'));
      //alert(JSON.parse(localStorage.getItem('currentuser')))
    }
    //alert(this.user);
    if(this.user != null)
    {
       this.isLoginRequired = false;
        
       //this.router.navigateByUrl('/home');      
    }
    else
    {
      this.isLoginRequired = true;
      //this.router.navigateByUrl('');
    }*/
  }
   
}
