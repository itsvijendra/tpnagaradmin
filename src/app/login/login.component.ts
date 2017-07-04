import { Component, OnInit} from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Authentication } from '../services/authentication.services'; 
import { EmitterService } from '../services/emitter.services';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   form: FormGroup;  
   private errorMessage:string;
   private user: User  = new User('','','','',false);
  constructor( formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private auth: Authentication) { 
     
      this.form = formBuilder.group({
          UserName:[''],
          Password:[''],
          UserEmail:[''],
          UserRole:[''],
          IsValidUser: [false]
      });
  }
  ngOnInit() {
    this.auth.getToken().subscribe(
                   response => {  
                        localStorage.setItem('token', response.token);                            
                     },
                   error=>  { alert(`Can't get token.`); }
                   );
   
  }
  validateInput()
   {
      var value = this.form.value;
      if(value.UserName == "")
      {
         this.errorMessage = "Please enter user name.";
         return false;
      }
      if(value.Password == "")
      {
         this.errorMessage = "Please enter password.";
         return false;
      }
      return true;
   }
   login() {
        var result;
        var responsevalue;
        var value = this.form.value;
        alert(JSON.stringify(this.form.value));
         if(this.validateInput())
         {
           
           alert(value.UserName);
          result = this.auth.login(value);
          result.subscribe( response => alert(JSON.stringify(response.output)),
                          error=>  { this.errorMessage = 'login failed, please try after sometime.' });
         }
          
   }

}
