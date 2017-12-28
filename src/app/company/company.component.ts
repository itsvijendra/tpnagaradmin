import { Component, OnInit } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../model/company';
import { Service } from '../model/service';
import { ServiceType } from '../model/servicetype';
import { CompanyServiceDestination } from '../model/companyservicedestination'
import { CompanyDet } from '../model/companydet'
import { CompanyService } from '../services/company.services';
import { EmitterService } from '../services/emitter.services';
import { CompanyContact } from 'app/model/companycontact';
import { CompanyServices } from 'app/model/companyservice';
import { Destination } from 'app/model/Destination';
import { State } from 'app/model/State';
import { City } from 'app/model/City';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  private CompanyDetList;
  private CountryList;
  private StateList: State[] = [];
  private CityList: City [] = [];
  private DestCityList: City [] = [];
  private DestStateList: State[] = [];
  private DestSelectedStateId: number = -1;
  private DestSelectedCityId: number = -1;
  private DestSelectedStateName: string = "";
  private DestSelectedCityName: string = "";
  private AreaList;
  private ServiceList;
  private ServiceListByType;
  private IsBranchDisplay: boolean = false;
  private errorMessage: string;
  private searchtext: string = "";
  private companyDetail: CompanyDet[] = [];
  private companyDetailNew: CompanyDet;
  private selectedServiceId:number = 0;
  private IsError:boolean = false;
  private IsBranchAdd:boolean = false;
  private ErrorField:string = "";
  private companyAddMode:boolean = false;
  private ParentCompany;
  private SaveAndAddNew:boolean = false;
  constructor(formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private companyservice: CompanyService) { }

  ngOnInit() {
    
    this.companyservice.getCompanyDetailsForAdmin(-1,0,'').subscribe(
      response => {
           this.CompanyDetList = response.recordset;
           //console.log(JSON.stringify(this.CompanyDetList));
           this.companyDetail = [];
           this.IsBranchDisplay = false;
           this.SetCompanyDetail(this.CompanyDetList);  
           this.loadCountryAndStateList();  
           
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve company services.'
             console.log(this.errorMessage);
           }
     ); 
     this.setNewCompany();   

  }
  loadCity()
  {
    //alert(this.companyDetailNew.StateId);
    this.companyservice.getCityByState(this.companyDetailNew.StateId).subscribe(
      response => {
              this.CityList = response.recordset;
              console.log(JSON.stringify(this.CityList));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve City.'
             console.log(this.errorMessage);
           }
     ); 
  }
  loadDestCity()
  {
    //alert(this.DestSelectedStateId);
    this.companyservice.getCityByState(this.DestSelectedStateId).subscribe(
      response => {
              this.DestCityList = response.recordset;
              console.log(JSON.stringify(this.CityList));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve City.'
             console.log(this.errorMessage);
           }
     ); 
  }
  loadService()
  {
    this.companyservice.getService().subscribe(
      response => {
              this.ServiceList = response.recordset;                            //console.log(JSON.stringify(this.CountryList[0].Id));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve Service List.'
             console.log(this.errorMessage);
           }
     );
  }
  loadServiceByType(type)
  {
    //alert(JSON.stringify(this.ServiceList));
    this.ServiceListByType = this.ServiceList.filter(x=> x.PublicType == type); 
    //alert(JSON.stringify(this.ServiceListByType));
  }
  setServices(srv,indx)
  {
      var selService = this.ServiceList.find(x=> x.ServiceId == srv.ServiceId) 
      //alert(JSON.stringify(selService));
      this.companyDetailNew.Services[indx].ServiceId = selService.ServiceId;
      this.companyDetailNew.Services[indx].ServiceName = selService.ServiceName;
      this.companyDetailNew.Services[indx].ServiceDesc = selService.ServiceDesc;
      this.companyDetailNew.Services[indx].ServiceDesc = selService.ServiceDesc;
      this.companyDetailNew.Services[indx].HasDestination = selService.HasDestination;
  }
  setDestSelectedCity(cityId)
  {
    this.DestSelectedCityId = cityId;
  }
  addDestination(indx)
  {
     //alert(this.DestSelectedStateId);
     var toStateId = this.DestSelectedStateId;
     var toCity = this.DestSelectedCityId;
     //alert(JSON.stringify(this.StateList));
     //alert(JSON.stringify(this.DestCityList));
     var State = this.StateList.find(x=> x.Id == this.DestSelectedStateId);
     var City = this.DestCityList.find(x=> x.Id == this.DestSelectedCityId);
     //alert(JSON.stringify(State));
     var toStateName =  State.State_Name;     
     var toCityName = City.City_Name;
     var destination = new Destination(0,0,toStateId,toCity,true,"Admin",null,"Admin",null,-1,toStateName,toCityName);
     this.companyDetailNew.Services[indx].Destination.push(destination);
     //alert(JSON.stringify(this.companyDetailNew.Services[indx].Destination));
  }
  DeleteDestination(srvIndx,desIndx)
  {
    this.companyDetailNew.Services[srvIndx].Destination.splice(desIndx,1);
  }
  loadCountryAndStateList()
  {
    this.companyservice.getCountry().subscribe(
      response => {
              this.CountryList = response.recordset;
              console.log(JSON.stringify(this.CountryList));
               this.companyservice.getState(this.CountryList[0].Id).subscribe(
                response => {
                        this.StateList = response.recordset;
                        //console.log(JSON.stringify(this.StateList));
                        this.loadService();
                    },
                   error=>  { 
                        this.errorMessage = 'Unable to retrieve company services.'
                       console.log(this.errorMessage);
                     }
               ); 
              //console.log(JSON.stringify(this.CountryList[0].Id));
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve company services.'
             console.log(this.errorMessage);
           }
     );
  }
  SetCompanyDetail(companydetails)
  {    
    for(let compdet in companydetails) {      
      var compcontacts:CompanyContact[] =[];
      var companyServices: Service[] = [];
      var servicesstr = companydetails[compdet].Services;
      //console.log(servicesstr);
      if(servicesstr != '' && servicesstr != null)
      {
          var services = servicesstr.split('|');
          for (let srv in services) {
            var serviceId = Number(services[srv].split('####')[0]);
            var servicename = services[srv].split("####")[1];
            var servicedesc = services[srv].split('####')[2];
            var Destinations = services[srv].split('####')[3] != "" ? services[srv].split('####')[3].split('[]') : [];
            // console.log(servicename);
            //console.log(Destinations);
            var servicetypeid = Number(services[srv].split('####')[4]);
            let companyDestinations: CompanyServiceDestination[] = [];
            for(let dest in Destinations)
            {
                //console.log( "dest:" + Destinations[dest]);
                companyDestinations.push(new CompanyServiceDestination(Number(Destinations[dest].split('@')[0])
                ,Destinations[dest].split('@')[1],Number(Destinations[dest].split('@')[2])));                
            }
            companyServices.push(new Service(companydetails[compdet].CompanyId,serviceId,servicename,servicedesc
              ,companyDestinations,companydetails[compdet].CompanyName,servicetypeid));
          }
      }
      if(companydetails[compdet].ContactNoDet != null && companydetails[compdet].ContactNoDet != '')
      {
        var contacts = companydetails[compdet].ContactNoDet.split('|')
        for(let cnct in contacts)
        {
              compcontacts.push(new CompanyContact(
                Number(contacts[cnct].split('##')[0])
              ,companydetails[compdet].CompanyId
              , contacts[cnct].split('##')[1]
              , contacts[cnct].split('##')[2]
              , contacts[cnct].split('##')[3] == "1"
              , contacts[cnct].split('##')[4] == "1"
               
          ))

        } 
      } 
      this.companyDetail.push(new CompanyDet(
         companydetails[compdet].CompanyId
        ,companydetails[compdet].CompanyName
        ,companydetails[compdet].CompanyDesc
        ,companydetails[compdet].OwnerName
        ,companydetails[compdet].ContactPerson
        ,compcontacts
        ,companydetails[compdet].Address
        ,companydetails[compdet].FaxNo
        ,companydetails[compdet].CountryId
        ,companydetails[compdet].CountryName
        ,companydetails[compdet].StateId
        ,companydetails[compdet].StateName
        ,companydetails[compdet].CityId
        ,companydetails[compdet].CityName
        ,companydetails[compdet].AreaId
        ,companydetails[compdet].AreaName
        ,companydetails[compdet].Website
        ,companydetails[compdet].PinCode
        ,companydetails[compdet].CompanyTypeId
        ,companydetails[compdet].CompanyType
        ,companydetails[compdet].CurrentStatusId
        ,companydetails[compdet].ServiceType
        ,companydetails[compdet].CreatedOn
        ,companydetails[compdet].CreatedBy
        ,companydetails[compdet].ModifiedOn
        ,companydetails[compdet].ModifiedBy
        ,companydetails[compdet].AppSource
        ,companyServices
        ,companydetails[compdet].ParentId
        ,companydetails[compdet].BranchName
      ));
     } 
     //console.log(JSON.stringify(this.companyDetail));   
  }
  ShowCompanyWithBranches(companyId,parentCompany)
  {

    this.companyservice.getCompanyDetailsForAdmin(companyId,1,'').subscribe(
      response => {
           this.CompanyDetList = response.recordset;
           console.log(JSON.stringify(this.CompanyDetList));
           this.companyDetail = [];
           this.companyDetail.push(parentCompany);
           this.SetCompanyDetail(this.CompanyDetList); 
           this.IsBranchDisplay = true;   
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve company services.'
             console.log(this.errorMessage);
           }
     );
  }
  CompanySearch()
  {   
    this.companyservice.getCompanyDetailsForAdmin(-1,0,this.searchtext).subscribe(
      response => {
           this.CompanyDetList = response.recordset;
           console.log(JSON.stringify(this.CompanyDetList));
           this.IsBranchDisplay = false;
           this.companyDetail = [];
           this.SetCompanyDetail(this.CompanyDetList);    
          },
         error=>  { 
              this.errorMessage = 'Unable to retrieve company services.'
             console.log(this.errorMessage);
           }
     );
  }
  AddServiceRow()
  {
    if(this.companyDetailNew)
    {
      var services = this.companyDetailNew.Services;
      var destinations : Destination[] = [];
      //var destination = new Destination(0,0,-1,-1,true,"Admin",null,"Admin",null,-1);
      //destinations.push(destination);      
      services.push(new Service(-1,-1,"","",null,"",-1,destinations));
      this.companyDetailNew.Services = services;
    }
  }
  DeleteServiceRow(index)
  {   
      var services = this.companyDetailNew.Services; 
      if(services.length > 1)
      {
        if(services.length >= (index + 1))
        {
          if(services[index].Destination.length > 0)
          {
              if(confirm("You have added destination for this service, Are you sure, you want to delete this Service?"))
              {
                services.splice(index,1);
                this.companyDetailNew.Services = services;
              }
          } 
          else
          {
            services.splice(index,1);
            this.companyDetailNew.Services = services;
          }                
         
        }
      }
      else
      {
         if(services[index].Destination.length > 0)
         {
            if(confirm("You have added destination for this service, Are you sure, you want to delete this Service?"))
            {
               services[index].Destination = [];
            }
          }
        //alert("At least one service is required to register company.")
      }
    
  }
  AddContactRow()
  {
    if(this.companyDetailNew)
    {
      var contact = this.companyDetailNew.ContactDet;
      contact.push(new CompanyContact(null,null,"","-1",false,true));
      this.companyDetailNew.ContactDet = contact;
    }
  }
  DeleteContactRow(index)
  {    
    if(this.companyDetailNew)
    {
      var contact = this.companyDetailNew.ContactDet;
      if(contact.length > 1)
      {
        if(contact.length >= (index + 1))
        {         
          contact.splice(index,1);
          this.companyDetailNew.ContactDet = contact;
        }
      }
      else
      {
        alert("At least one contact detail is required to register company.")
      }
    }
  } 
  setNewCompany(){
        var compcontact = new CompanyContact(null,null,"","-1",false,true);    
        var contacts: CompanyContact[] = [];
        contacts.push(compcontact)
        var destinations : Destination[] = [];
        //var destination = new Destination(0,0,-1,-1,true,"Admin",null,"Admin",null,-1);
        //destinations.push(destination);
        var companyService = new Service(-1,-1,"","",null,"",-1,destinations)
        var services: Service[] = [];
        services.push(companyService);
        this.companyDetailNew = new CompanyDet(
         null
        ,""
        ,""
        ,""
        ,""
        ,contacts
        ,""
        ,""
        ,1
        ,""
        ,-1
        ,""
        ,-1
        ,""
        ,-1
        ,""
        ,""
        ,""
        ,-1
        ,""
        ,""
        ,1
        ,null
        ,1
        ,null
        ,""
        ,null
        ,services
        ,0
        ,null
      );
  }
  addCompany()
  {
    this.setNewCompany();
  }
  destShowHide(serviceid)
  {    
    if(this.selectedServiceId == serviceid)
    {
      this.selectedServiceId = 0;
    }
    else
    {
       this.selectedServiceId = serviceid;
    }
  }
  validateInput()
  {
    this.IsError = false;
    if(this.companyDetailNew.CompanyName == null || this.companyDetailNew.CompanyName == "")
    {
      this.IsError = true;  
    }
    if(this.IsBranchAdd && (this.companyDetailNew.BranchName == null || this.companyDetailNew.BranchName == ""))
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.OwnerName == null || this.companyDetailNew.OwnerName == "")
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.CompanyTypeId == null || this.companyDetailNew.CompanyTypeId == -1)
    {
       this.IsError = true;
    }
    if(this.companyDetailNew.CountryId == null || this.companyDetailNew.CountryId == -1)
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.StateId == null || this.companyDetailNew.StateId == -1)
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.CityId == null || this.companyDetailNew.CityId == -1)
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.Address == null || this.companyDetailNew.Address == "")
    {
      this.IsError = true;
    }
    if(this.companyDetailNew.PinCode == null || this.companyDetailNew.PinCode == "")
    {
      this.IsError = true;
    }
    for (let contact in this.companyDetailNew.ContactDet) {
      if(this.companyDetailNew.ContactDet[contact].ContactNo == null || this.companyDetailNew.ContactDet[contact].ContactNo == "")
      {
        this.IsError = true;       
      }
      if(this.companyDetailNew.ContactDet[contact].ContactType == null || this.companyDetailNew.ContactDet[contact].ContactType == "")
      {
        this.IsError = true;       
      }
    }
    return !(this.IsError) 
  }
  AddNewCompany() 
  {
    this.IsBranchAdd = false;
    this.IsError = false;
    this.companyAddMode = true;
    this.ServiceListByType = [];
    this.setNewCompany();
  }
  AddBranchCompany(parentcompany) 
  {   
    this.IsError = false;    
    this.companyAddMode = true;
    this.setNewCompany();
    this.loadServiceByType(parentcompany.CompanyTypeId);
    this.companyDetailNew.ParentId = parentcompany.CompanyId;
    this.companyDetailNew.CompanyName = parentcompany.CompanyName;
    this.companyDetailNew.CompanyTypeId = parentcompany.CompanyTypeId;
    this.companyDetailNew.CompanyType = parentcompany.CompanyType;
    this.IsBranchAdd = true;
    this.ParentCompany = parentcompany;

  }
  Save()
  {   
    if(this.validateInput())
    {
      this.companyDetailNew.CompanyId = 0;
      var CompanyContactStr = "";
      for (let contact in this.companyDetailNew.ContactDet) {
        if(CompanyContactStr != "")
          CompanyContactStr += "|" 
          CompanyContactStr += String(this.companyDetailNew.ContactDet[contact].ContactNo) + "#" + 
                               this.companyDetailNew.ContactDet[contact].ContactType + "#" +
                               String(this.companyDetailNew.ContactDet[contact].IsPrimary) + "#" +
                               String(this.companyDetailNew.ContactDet[contact].IsActive)
      }
      var CompanyServicesStr = "";      
      for (let srv in this.companyDetailNew.Services) {
        if(CompanyServicesStr != "")
            CompanyServicesStr += "|"
            CompanyServicesStr +=  String(this.companyDetailNew.Services[srv].ServiceId) + "#" +
                             String(this.companyDetailNew.Services[srv].ServiceId) + "#" + "1"
           var deststr = ""; 
           for(let dest in this.companyDetailNew.Services[srv].Destination) 
           { 
            if(deststr != "")
                deststr += ","            
                deststr += String(this.companyDetailNew.Services[srv].Destination[dest].ToState) + "#" +
                       String(this.companyDetailNew.Services[srv].Destination[dest].ToCity) + "#" + "1";
           }
           if(deststr != "")
           {
                CompanyServicesStr = CompanyServicesStr + "@" + deststr
           }
      }
      console.log(CompanyServicesStr);
      console.log(CompanyContactStr);
      this.companyDetailNew.CompanyServicesDestString = CompanyServicesStr;
      this.companyDetailNew.ContactDetailsStr = CompanyContactStr;
      this.companyservice.saveCompanyDetails(this.companyDetailNew, true).subscribe(
        response => {
                this.companyservice.getCompanyDetailsForAdmin(-1,0,'').subscribe(
                  response => {
                      this.CompanyDetList = response.recordset;
                      //console.log(JSON.stringify(this.CompanyDetList));
                      this.companyDetail = [];
                      this.IsBranchDisplay = false;
                      this.SetCompanyDetail(this.CompanyDetList);  
                      this.loadCountryAndStateList(); 
                       this.IsError = false;    
                       this.setNewCompany();
                        alert(JSON.stringify(this.ParentCompany));
                        if(this.SaveAndAddNew)
                        {
                          if(this.IsBranchAdd)
                          {
                            if(this.ParentCompany != null)
                            {
                              this.companyDetailNew.ParentId = this.ParentCompany.CompanyId;
                              this.companyDetailNew.CompanyName = this.ParentCompany.CompanyName;
                              this.companyDetailNew.CompanyTypeId = this.ParentCompany.CompanyTypeId;
                              this.companyDetailNew.CompanyType = this.ParentCompany.CompanyType;
                              
                            }
                          }
                          else
                          {
                            this.ParentCompany = null;                            
                          }
                        }
                        else
                        {
                          this.ParentCompany = null;
                          this.companyAddMode = false; 
                        }                   
                      },
                    error=>  { 
                          this.errorMessage = 'Unable to retrieve company services.'
                        console.log(this.errorMessage);
                      }
                ); 
            },
           error=>  { 
                this.errorMessage = 'Unable to retrieve company services.'
               console.log(this.errorMessage);
             }
       );
       this.IsError = false;
    }
    
  }
  SaveCompany()
  {
    this.SaveAndAddNew = false;
    this.Save();   
  }
  SaveCompanyAndAddNewCompany()
  {    
      this.SaveAndAddNew = true;
      this.Save();      
  }
  Cancel()
  {
    this.SaveAndAddNew = false;
    this.companyAddMode = false;
    this.IsError = false;
    this.setNewCompany();
    this.ParentCompany = null;
  }

}
