import { Component, OnInit,ViewChild,Directive } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.services';
import { EmitterService } from '../../services/emitter.services';
import { LoginServices } from '../../model/loginservice';

@Component({
  selector: 'app-login-services',
  templateUrl: './login-services.component.html',
  styleUrls: ['./login-services.component.css']
})
export class LoginServicesComponent implements OnInit {
  private LoginDetails;
  private loginService: LoginServices;
  private LoginStatusTypes;
  private errorMessage: string;
  private searchtext: string = "";
  constructor(formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService) { }

  ngOnInit() {
         this.loginservice.getLoginDetails('').subscribe(
                       response => {
                            this.LoginDetails = response.recordset; console.log(JSON.stringify(response.recordset))
                              this.loginservice.getLoginStatusTypes().subscribe(
                                  response => {this.LoginStatusTypes = response.recordset; console.log(JSON.stringify(response.recordset))},
                                 error=>  {
                                    this.errorMessage = 'Unable to retrieve Login status types.' 
                                    console.log(this.errorMessage);
                                 }
                               );    
                           },
                          error=>  { 
                               this.errorMessage = 'Unable to retrieve login details.'
                              console.log(this.errorMessage);
                            }
                      );

  }
  LoginDetailsSearch()
  {     
     console.log(this.searchtext);
     this.loginservice.getLoginDetails(this.searchtext).subscribe(
                       response => {this.LoginDetails = response.recordset; console.log(JSON.stringify(response.recordset))},
                          error=>  { this.errorMessage = 'Unable to retrieve login details.' }
                      );  
  }
  ApproveLoginDetails(loginDetails)
  {
     console.log(JSON.stringify(loginDetails));
     this.loginservice.approveLoginDetails(loginDetails.LoginId,loginDetails.Status,loginDetails.Broker_Search_Enabled).subscribe(
                       response => {
                         this.loginservice.getLoginDetails(this.searchtext).subscribe(
                          response => {this.LoginDetails = response.recordset; console.log(JSON.stringify(response.recordset))},
                          error=>  { this.errorMessage = 'Unable to retrieve login details.' }
                           );  
                       },
                          error=>  { this.errorMessage = 'Unable to retrieve login details.' }
                      );       
  }

}
