import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.services';
import { City } from 'app/model/City';
import { State } from 'app/model/State';
import { ServiceCity } from 'app/model/ServiceCity';
import { ServiceCityDet } from 'app/model/ServiceCityDet';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-city-service-mapping',
  templateUrl: './city-service-mapping.component.html',
  styleUrls: ['./city-service-mapping.component.css']
})
export class CityServiceMappingComponent implements OnInit {
  private servicedetlist: ServiceCityDet[] = [];
  private errorMessage: string;
  private CityList: City [] = [];
  private StateList: State[] = [];
  private selectedStateId = -1;
  private selectedCityId = -1;
  private serviceCity: ServiceCity = new  ServiceCity (null,null,null,null);
  
  constructor(formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private companyservice: CompanyService) { }

  ngOnInit() {
    this.showLoading();  
          this.companyservice.getState(1).subscribe(
            response => {
                    this.StateList = response.recordset;
                    this.hideLoading();
                },
                error=>  { 
                    this.errorMessage = 'Unable to retrieve company services.'
                    console.log(this.errorMessage);
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
  loadCity()
  {
    //alert(this.DestSelectedStateId);
    this.showLoading();
    this.companyservice.getCityByState(this.selectedStateId).subscribe(
      response => {
              this.CityList = response.recordset;
              console.log(JSON.stringify(this.CityList));
              this.hideLoading();
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve City.';
             console.log(this.errorMessage);
            this.hideLoading();            
           }
     ); 
  }
  loadService()
  {
    this.showLoading();
    this.companyservice.getServiceDetails(this.selectedCityId).subscribe(
      response => {
              this.servicedetlist = response.recordset;  
              this.hideLoading();                          
              console.log(JSON.stringify(this.servicedetlist));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve Service List.'
              console.log(this.errorMessage);
              this.hideLoading();
           }
     );
  }
 
  Save()
  {
    this.serviceCity = new  ServiceCity (null,null,null,null);
    var srvCityList = '';
    for(let srvcty in this.servicedetlist)
    {
        if(this.servicedetlist[srvcty].IsSelected)
        {            
             if(srvCityList != "")
               srvCityList += "|"
            srvCityList += this.servicedetlist[srvcty].Service_Det_Id;
        }
    }
      this.serviceCity.ServiceDetailIds = srvCityList;
      this.serviceCity.CityId = this.selectedCityId;
      this.serviceCity.SeqNo = 1;
      this.serviceCity.UserId = 1;
      this.companyservice.saveServiceCityMapping(this.serviceCity).subscribe(
        response => {
              this.loadService()
            },
           error=>  { 
                this.errorMessage = 'Unable to save service city mapping.'
               console.log(this.errorMessage);
               this.hideLoading();
             }
       );     
      //alert(JSON.stringify(this.serviceCity));
  }
}
