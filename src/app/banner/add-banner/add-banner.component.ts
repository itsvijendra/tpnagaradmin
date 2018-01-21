import { Component, OnInit,ViewChild,Directive } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Banner } from '../../model/banner';
import { BannerServices } from '../../services/banner.services';
import { EmitterService } from '../../services/emitter.services';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',  
  styleUrls: ['./add-banner.component.css'],
  
})
export class AddBannerComponent implements OnInit {
  form: FormGroup;  
  private isInsert:boolean = true;
	private banner:Banner = new Banner(null,'','select','',null,null,null,true);
  private bannerList;
  private token;
  private errorMessage: string;
  private errorGridMessage: string;
  date: DateModel;
  options: DatePickerOptions;

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
        BannerUrl:[],
        BannerRedirectUrl:[],
        BannerStartDate:[],
        BannerEndDate:[],
        IsActive:[]
      });
      this.options = new DatePickerOptions();  
      this.options.format = 'DD/MM/YYYY';
      this.options.autoApply = true;
  }
 
  ngOnInit() {
     
    /*this.bannerServices.getToken().subscribe(
                   response => {                         
                      this.token = response.token;
                      localStorage.setItem('token', response.token);
                                          
                     },
                   error=>  { this.errorMessage = 'Unable to retrieve token.' }
                   );*/
                   this.showLoading();
                   this.bannerServices.getAllBanner('dfaewrwe2542345').subscribe(
                       response =>
                        { 
                          this.bannerList = response.recordset;
                          this.hideLoading();
                        },
                          error=>  { 
                            this.errorMessage = 'Unable to retrieve banner.';
                            this.hideLoading();
                        }
                      );
     
  }
  showLoading()
  {
    var divloading = document.getElementById('loadingDiv');
    divloading.setAttribute("style","display:block");
  }
  hideLoading()
  {
    var divloading = document.getElementById('loadingDiv');
    divloading.setAttribute("style","display:none");
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
      if(value.BannerUrl == null)
      {
         this.errorMessage = "Please enter banner URL";
         return false;
      }
      if(value.BannerRedirectUrl == null)
      {
         this.errorMessage = "Please enter banner redirect URL";
         return false;
      }
      if(value.BannerStartDate == null)
      {
         this.errorMessage = "Please enter Banner Start Date.";
         return false;
      }
      if(value.BannerEndDate == null)
      {
         this.errorMessage = "Please enter Banner End Date.";
         return false;
      }
      this.errorMessage = ""; 
      return true;
   }
   editBanner(banner)
   { 
     this.banner = banner;    
     console.log(JSON.stringify(banner));
   }  
   deleteBanner(bannerid)
   {
       var result;
       if(confirm("Are you sure you want to delete this record?"))
       {
        result = this.bannerServices.deleteBanner(bannerid);
        this.showLoading();
        result.subscribe(data =>  this.bannerServices.getAllBanner(localStorage.getItem('token')).subscribe(
                        response => 
                         {
                           this.bannerList = response.recordset;
                           this.hideLoading();
                         }
                         ,
                        error=>  { 
                          this.errorMessage = 'Unable to retrieve token';
                          this.hideLoading();
                        }
                      ));
       }
   }
   save() {
    var result,
        bannerValue = this.form.value;
        //bannerValue.BannerStartDate = this.form.value.BannerStartDate.formatted;
        //bannerValue.BannerEndDate = this.form.value.BannerEndDate.formatted;
        //JSON.stringify(bannerValue);
     //alert(bannerValue.BannerId);
     if(this.validateInput())
     {
        if (bannerValue.BannerId){
          //alert(bannerValue.BannerId)
          result = this.bannerServices.updateBanner(bannerValue);
        } else {
        // alert('calling add banner')
          result = this.bannerServices.addBanner(bannerValue);
        }
        this.showLoading();
         result.subscribe(data =>  this.bannerServices.getAllBanner(localStorage.getItem('token')).subscribe(
                          response => {
                            this.bannerList = response.recordset;
                            this.hideLoading();
                          },
                          error=>  { 
                            this.errorMessage = 'Unable to retrieve token.';
                            this.hideLoading();
                          }
                        ));
         this.banner = new Banner(null,'','select','',null,null,null,true);  
       }
   }
}
