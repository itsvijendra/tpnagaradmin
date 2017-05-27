import { Component, OnInit,ViewChild,Directive } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Banner } from '../../model/banner';
import { BannerServices } from '../../services/banner.services';
import { EmitterService } from '../../services/emitter.services';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',  
  styleUrls: ['./add-banner.component.css'],
  
})
export class AddBannerComponent implements OnInit {
  form: FormGroup;  
  private isInsert:boolean = true;
	private banner:Banner = new Banner(null,'','select','',null,null,true);
  private bannerList;
  private token;
  private errorMessage: string;
  private errorGridMessage: string;

  constructor( formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private bannerServices: BannerServices) { 
     
      this.form = formBuilder.group({
        BannerId:[],
        BannerName:['', [
          Validators.required,
          Validators.minLength(3)
        ]],
        BannerSize:[],
        BannerImageUrl:[],
        BannerStartDate:[],
        BannerEndDate:[],
        IsActive:[]
      });
       
  }
 
  ngOnInit() {
     
    this.bannerServices.getToken().subscribe(
                   response => {                         
                      this.token = response.token;
                      localStorage.setItem('token', response.token);
                        this.bannerServices.getAllBanner(this.token).subscribe(
                       response => this.bannerList = response.recordset,
                          error=>  { this.errorMessage = 'Unable to retrieve banner.' }
                      );                  
                     },
                   error=>  { this.errorMessage = 'Unable to retrieve token.' }
                   );
    
     
  }
   validateInput()
   {
      var value = this.form.value;
      if(value.BannerName == "")
      {
         this.errorMessage = "Please enter Banner Name";
         return false;
      }
      if(value.BannerSize == "select")
      {
         this.errorMessage = "Please Banner Size.";
         return false;
      }
      if(value.BannerStartDate == null)
      {
         this.errorMessage = "Please select Banner Start Date.";
         return false;
      }
      if(value.BannerEndDate == null)
      {
         this.errorMessage = "Please select Banner End Date.";
         return false;
      }
      this.errorMessage = ""; 
      return true;
   }
   editBanner(banner)
   {     
     this.banner = banner;
   }  
   deleteBanner(bannerid)
   {
       var result;
       if(confirm("Are you sure you want to delete this record?"))
       {
        result = this.bannerServices.deleteBanner(bannerid);
        result.subscribe(data =>  this.bannerServices.getAllBanner(localStorage.getItem('token')).subscribe(
                        response => this.bannerList = response.recordset,
                        error=>  { this.errorMessage = 'Unable to retrieve token' }
                      ));
       }
   }
   save() {
    var result,
        bannerValue = this.form.value;
     //alert(bannerValue.BannerId);
     if(this.validateInput())
     {
        if (bannerValue.BannerId){
          alert(bannerValue.BannerId)
          result = this.bannerServices.updateBanner(bannerValue);
        } else {
        // alert('calling add banner')
          result = this.bannerServices.addBanner(bannerValue);
        }
         result.subscribe(data =>  this.bannerServices.getAllBanner(localStorage.getItem('token')).subscribe(
                          response => this.bannerList = response.recordset,
                          error=>  { this.errorMessage = 'Unable to retrieve token.' }
                        ));
         this.banner = new Banner(null,'','select','',null,null,true);  
       }
   }
}
