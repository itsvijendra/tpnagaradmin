import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.services';
import { City } from 'app/model/City';
import { State } from 'app/model/State';
import { ServiceCity } from 'app/model/ServiceCity';
import { ServiceCityDet } from 'app/model/ServiceCityDet';
import { StateSelected } from 'app/model/stateSelected';
import { NearByCity } from 'app/model/nearbycity';
import { NearByCityTran } from 'app/model/nearbycityTran';
import { forEach } from '@angular/router/src/utils/collection';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-near-by-city-mapping',
  templateUrl: './near-by-city-mapping.component.html',
  styleUrls: ['./near-by-city-mapping.component.css']
})
export class NearByCityMappingComponent implements OnInit {

  private servicedetlist: ServiceCityDet[] = [];
  private errorMessage: string;
  private CityList: City [] = [];
  private AllCityList: City[] = [];
  private SearchedCityList : City[] = [];
  private StateList: State[] = [];
  private StateListSelected: StateSelected[] = [];
  private NearByCityList: NearByCity[] = [];
  private selectedStateId = -1;
  private citySearchText = '';
  private selectedCityId = -1;
  private nearByCityDetails;
  private nearbyCityDetailStr: NearByCityTran = new NearByCityTran(null,null);
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
                    this.StateListSelected = response.recordset;
                    //this.hideLoading();
                    this.companyservice.getAllCity().subscribe(
                      response => {
                              this.AllCityList = response.recordset;
                              this.SearchedCityList = this.AllCityList
                              //console.log(JSON.stringify(this.CityList));
                              //this.loadNearByCityDetails()
                              this.hideLoading();
                          },
                         error=>  { 
                              this.errorMessage = 'Unable to retrieve City.';
                             console.log(this.errorMessage);
                            this.hideLoading();            
                           }
                     ); 
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
              //console.log(JSON.stringify(this.CityList));
              this.hideLoading();
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve City.';
             console.log(this.errorMessage);
            this.hideLoading();            
           }
     ); 
  }
  searchCity()
  {
   this.SearchedCityList = this.AllCityList.filter(x=> x.City_Name.toLowerCase().indexOf(this.citySearchText.toLowerCase()) >= 0);
  }
  loadNearByCityDetails()
  {
    this.showLoading();
    this.companyservice.getNearByCityDetails(this.selectedCityId).subscribe(
      response => {
              this.NearByCityList = response.recordset;  
              this.hideLoading();                          
              //alert(JSON.stringify(this.NearByCityList));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve Near By City List.'
              console.log(this.errorMessage);
              this.hideLoading();
           }
     );
  }
  loadService()
  {

  }
  DeleteNearByCity(cityindex)
  {
    this.NearByCityList.splice(cityindex,1);
  }
  AddNearByCity()
  {
     var selectedCityList = this.SearchedCityList.filter(x=> x.IsSelected == true);
     selectedCityList.forEach(element => {
       //alert(this.NearByCityList.find(x=> x.NearByCityId == element.Id));
       if(!this.NearByCityList.find(x=> x.NearByCityId == element.Id) && this.selectedCityId != -1)
        {     
          this.NearByCityList.push(new NearByCity(this.selectedCityId,element.Id,element.City_Name
          ,element.IsBroker == true,element.IsContractor == true,element.IsSelected));
         }
     });
    
  }
 
  Save()
  {
    this.nearbyCityDetailStr = new NearByCityTran(null,null);
    var nearbyCityStr = '';
    for(let nearByCity in this.NearByCityList)
    {    
        if(this.NearByCityList[nearByCity].IsSelected)
        { 
          if(nearbyCityStr != "") nearbyCityStr += "|"    
          nearbyCityStr += this.NearByCityList[nearByCity].NearByCityId + "#" + 
          this.NearByCityList[nearByCity].IsBroker + "#" + this.NearByCityList[nearByCity].IsContractor + "#" +
          this.NearByCityList[nearByCity].BrokerSeqNo + "#" + this.NearByCityList[nearByCity].ContractorSeqNo
        }
    }
        
     this.nearbyCityDetailStr.CityId = this.selectedCityId
     this.nearbyCityDetailStr.NearByCityString = nearbyCityStr
     console.log(JSON.stringify(this.nearbyCityDetailStr));
      if(nearbyCityStr != "" && this.selectedCityId != -1)
      {
        this.companyservice.saveNearByCity(this.nearbyCityDetailStr).subscribe(
          response => {
                this.loadNearByCityDetails();
              },
            error=>  { 
                  this.errorMessage = 'Unable to save near by city details.'
                console.log(this.errorMessage);
                this.hideLoading();
              }
        );  
      }   
      //alert(JSON.stringify(this.serviceCity));
  }

}
