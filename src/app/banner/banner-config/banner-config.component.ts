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
    this.bannerServices.getAllBannerConfig().subscribe(
                       response => this.bannerConfigList = response.recordset,
                       error=>  { alert(`Can't get banner config.`); }
                    );
  }
   
   save() {
    var result,
        bannerconfigValue = this.form.value;
     
    if (bannerconfigValue.BannerConfigId){
      result = this.bannerServices.updateBannerConfig(bannerconfigValue);
    } else {
      result = this.bannerServices.addBannerConfig(bannerconfigValue);
    }

    result.subscribe(data => this.bannerServices.getAllBannerConfig().subscribe(
                       response => this.bannerConfigList = response.recordset,
                       error=>  { alert(`Can't get banner config.`); }
                    ));
  }
}
