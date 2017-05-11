import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Banner } from '../../model/banner';
import { BannerServices } from '../../services/banner.services';
import { EmitterService } from '../../services/emitter.services';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {
  form: FormGroup;  
  private isInsert:boolean = true;
	private banner:Banner = new Banner(null,'','select','',null,null,true);
  private bannerList;
  constructor( formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private bannerServices: BannerServices) { 
     
      this.form = formBuilder.group({
        BannerId:[],
        BannerName:[],
        BannerSize:[],
        BannerImageUrl:[],
        BannerStartDate:[],
        BannerEndDate:[],
        IsActive:[]
      })
  }
 
  ngOnInit() {
     this.bannerServices.getAllBanner().subscribe(
                       response => this.bannerList = response.recordset,
                       error=>  { alert(`Can't get banners.`); }
                    );
    console.log(this.bannerList);
  }
   editBanner(banner)
   {     
     this.banner = banner;
   }  
   save() {
    var result,
        bannerValue = this.form.value;
     //alert(bannerValue.BannerId);
    if (bannerValue.BannerId){
      alert(bannerValue.BannerId)
      result = this.bannerServices.updateBanner(bannerValue);
    } else {
     // alert('calling add banner')
      result = this.bannerServices.addBanner(bannerValue);
    }
    result.subscribe(data =>  this.bannerServices.getAllBanner().subscribe(
                       response => this.bannerList = response.recordset,
                       error=>  { alert(`Can't get banners.`); }
                    ));
    this.banner = new Banner(null,'','select','',null,null,true);  
  }
}
