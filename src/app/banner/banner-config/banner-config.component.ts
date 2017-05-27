import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerConfig } from '../../model/banner-config';
import { BannerServices } from '../../services/banner.services';
import { EmitterService } from '../../services/emitter.services';

@Component({
  selector: 'app-banner-config',
  templateUrl: './banner-config.component.html',
  styleUrls: ['./banner-config.component.css']
})
export class BannerConfigComponent implements OnInit {

 form: FormGroup;  
  private isInsert:boolean = true;
	private bannerconfig:BannerConfig = new BannerConfig(null,'select','select',0);
  private bannerConfigList;
  private errorMessage:string;
  constructor( formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private bannerServices: BannerServices) { 
     
      this.form = formBuilder.group({
        BannerConfigId:[],
        BannerPageCategory:[],
        BannerSize:[],
        BannerFrequency:[]
      })
  }

  ngOnInit() {
      this.bannerServices.getToken().subscribe(
                   response => {  
                      localStorage.setItem('token', response.token);
                         this.bannerServices.getAllBannerConfig(response.token).subscribe(
                       response => this.bannerConfigList = response.recordset,
                       error=>  { alert(`Can't get banner config.`); }
                       );          
                     },
                   error=>  { alert(`Can't get token.`); }
                   );
   
  }
   validateInput()
   {
      var value = this.form.value;
      
      if(value.BannerPageCategory == "select")
      {
         this.errorMessage = "Please select page category.";
         return false;
      }
      if(value.BannerSize == "select")
      {
         this.errorMessage = "Please select Banner size.";
         return false;
      }
      if(value.BannerFrequency == "select")
      {
         this.errorMessage = "Please select Banner frequency.";
         return false;
      }
      this.errorMessage = ""; 
      return true;
   }
   editBannerConfig(bannerconfig)
   { 
     alert(bannerconfig.BannerConfigId);   
     this.bannerconfig = bannerconfig;
   } 
   deleteBannerConfig(bannerconfigid)
   {
       var result;
       if(confirm("Are you sure you want to delete this record?"))
       {
        
        result = this.bannerServices.deleteBannerConfig(bannerconfigid);
        result.subscribe(data => this.bannerServices.getAllBannerConfig(localStorage.getItem('token')).subscribe(
                        response => this.bannerConfigList = response.recordset,
                        error=>  { alert(`Can't delete banner config.`); }
                      ));
       }
   }
   save() {
    var result,
        bannerconfigValue = this.form.value;
     
    if (bannerconfigValue.BannerConfigId > 0){
      result = this.bannerServices.updateBannerConfig(bannerconfigValue);
    } else {
      result = this.bannerServices.addBannerConfig(bannerconfigValue);
    }

    result.subscribe(data => this.bannerServices.getAllBannerConfig(localStorage.getItem('token')).subscribe(
                       response => this.bannerConfigList = response.recordset,
                       error=>  { alert(`Can't get banner config.`); }
                    ));
  }
}
