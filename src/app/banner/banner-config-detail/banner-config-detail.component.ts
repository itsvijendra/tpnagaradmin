import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerConfigDetail } from '../../model/banner-config-detail';
import { BannerServices } from '../../services/banner.services';
import { EmitterService } from '../../services/emitter.services';
@Component({
  selector: 'app-banner-config-detail',
  templateUrl: './banner-config-detail.component.html',
  styleUrls: ['./banner-config-detail.component.css']
})
export class BannerConfigDetailComponent implements OnInit {
  form: FormGroup;  
  private isInsert:boolean = true;
	private bannerconfigdetail:BannerConfigDetail = new BannerConfigDetail(0,0,0,0,0);
  private bannerConfigdetailList;
  private cityList;
  private bannerConfigList;
  private bannerList;
  constructor(formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private bannerServices: BannerServices) {
       this.form = formBuilder.group({
        BannerConfigDetId:[],
        BannerId:[],
        BannerConfigId:[],
        BannerCityId:[],
        BannerDisplayOrder:[]
      })
     }

  ngOnInit() {
    this.showLoading();
    this.bannerServices.getAllCity(localStorage.getItem('token')).subscribe(
                       response => {
                         this.cityList = response.recordset;
                            this.bannerServices.getAllBannerConfig(localStorage.getItem('token')).subscribe(
                            response => {
                              this.bannerConfigList = response.recordset;
                                this.bannerServices.getAllBanner(localStorage.getItem('token')).subscribe(
                                  response => {
                                    this.bannerList = response.recordset
                                    this.bannerServices.getAllBannerConfigDetail(localStorage.getItem('token')).subscribe(
                                      response => 
                                      {
                                         this.bannerConfigdetailList = response.recordset;
                                         this.hideLoading();
                                      },
                                      error=>  { 
                                        this.hideLoading();
                                        alert(`Can't get banner config detail.`); 
                                      }
                                    )
                                  },
                                  error=>  { 
                                    this.hideLoading();
                                    alert(`Can't get banners.`); 
                                  }
                                );
                             },
                             error=>  { 
                               alert(`Can't get banner config.`);
                               this.hideLoading();
                            }
                          );
                        }
                       ,
                       error=>  { 
                         alert(`Can't get city.`);
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
  editBannerConfigDetail(bannerconfigdetail)
   { 
     //alert(bannerconfigdetail.BannerConfigDetId);   
     this.bannerconfigdetail = new BannerConfigDetail(bannerconfigdetail.BannerConfigDetId,bannerconfigdetail.BannerId,bannerconfigdetail.BannerConfigId,bannerconfigdetail.BannerCityId,bannerconfigdetail.BannerDisplayOrder);
   } 
   deleteBannerConfigDetail(bannerconfigdetail)
   {
       var result;
       if(confirm("Are you sure you want to delete this record?"))
       {
        
        result = this.bannerServices.deleteBannerConfigDetail(bannerconfigdetail);
        this.showLoading();
        result.subscribe(data => this.bannerServices.getAllBannerConfigDetail(localStorage.getItem('token')).subscribe(
                       response => {
                         this.bannerConfigdetailList = response.recordset;
                         this.hideLoading(); 
                        },
                       error=>  { 
                         alert(`Can't get banner config detail.`);
                         this.hideLoading();
                      }
                    ));
       }
   }
   save() {
    var result,
        bannerconfigdetailValue = this.form.value;
     
    if (bannerconfigdetailValue.BannerConfigDetId){
      result = this.bannerServices.updateBannerConfigDetail(bannerconfigdetailValue);
    } else {
      result = this.bannerServices.addBannerConfigDetail(bannerconfigdetailValue);
    }
    this.showLoading();
    result.subscribe(data => this.bannerServices.getAllBannerConfigDetail(localStorage.getItem('token')).subscribe(
                       response => {
                          this.bannerConfigdetailList = response.recordset;
                          this.hideLoading();
                        },
                       error=>  {
                         this.hideLoading();
                         alert(`Can't get banner config detail.`);
                      }
                    ));
    this.bannerconfigdetail = new BannerConfigDetail(0,0,0,0,0);
  }
}
