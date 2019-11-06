import { Component, OnInit,ViewChild,Directive } from '@angular/core';
import { LeftMenuComponent } from '../../left-menu/left-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../model/company';
import { Service } from '../../model/service';
import { ServiceType } from '../../model/servicetype';
import { CompanyServiceDestination } from '../../model/companyservicedestination'
import { CompanyServices } from '../../model/companyservice'
import { CompanyService } from '../../services/company.services';
import { EmitterService } from '../../services/emitter.services';
import { User } from '../../model/user';
@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit {
  orm: FormGroup; 
  private user:User;
  private userCompanyServiceApprovalAccess: boolean = false; 
  private isInsert:boolean = true;
  private desInd: string = "+";
  private selectedServiceId:number = 0;
  private isServiceSelected:boolean = false;
	private company:Company; 
  private CompanyServicesList;
  private service: Service[] = [];
  private token;
  private errorMessage: string;
  private errorGridMessage: string;
  private companyServiceDestinations: CompanyServiceDestination[] = [];
  private companyservices: CompanyServices[] =[];
  private companyType: number = -1; 
  private searchtext: string = "";
  private serviceTypes: ServiceType[] = [];
  private setAllCategory : string = "";
  
  constructor(formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private companyservice: CompanyService) { }

  ngOnInit() {    
        this.showLoading(); 
        this.user = JSON.parse(localStorage.getItem('currentuser'));
        var indx = this.user.userAccess.findIndex(x => x.PermissionName == 'CompanyServiceApprover');
        if(indx >= 0) this.userCompanyServiceApprovalAccess = true; 
        this.companyservice.getCompanyDetailsForApproval('23468732',-1,-1,'').subscribe(
                       response => {
                            this.CompanyServicesList = response.recordset; console.log(JSON.stringify(response.recordset))
                              this.companyservice.getServiceTypes().subscribe(
                                  response => {this.serviceTypes = response.recordset; console.log(JSON.stringify(response.recordset))},
                                 error=>  {
                                    this.errorMessage = 'Unable to retrieve service types.' 
                                    console.log(this.errorMessage);
                                 }
                               );   
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
  SetCategoryToAll(destinations, srvId)
  {
    //this.destShowHide(srvId);
    if(this.setAllCategory != "")
    {
      for (let dest in destinations) {
        destinations[dest].ServiceTypeId = this.setAllCategory
        var indx = this.companyServiceDestinations.findIndex(x => x.CompanyServiceDestId == destinations[dest].CompanyServiceDestId); 
       console.log(indx); 
       if(indx >= 0)
       {
         this.companyServiceDestinations.splice(indx,1);
       }     
       this.companyServiceDestinations.push(new CompanyServiceDestination(destinations[dest].CompanyServiceDestId,destinations[dest].CompanyServiceDest,destinations[dest].ServiceTypeId));
      }
    }
  }
  ApproveCompanyServices(comp)
  {
      this.company = comp;
      var servicesstr = this.company.Services;
      var services = servicesstr.split('|');
      this.service = [];
      for (let srv in services) {
           var serviceId = Number(services[srv].split('####')[0]);
           var servicename = services[srv].split("####")[1];
           //console.log(serviceId);
           var servicedesc = services[srv].split('####')[2];
           var Destinations = services[srv].split('####')[3] != "" ? services[srv].split('####')[3].split('[]') : [];
           console.log('dest');
           console.log(Destinations);
           var servicetypeid = Number(services[srv].split('####')[4]);
           let companyDestinations: CompanyServiceDestination[] = [];
           for(let dest in Destinations)
           {
                console.log( "dest:" + Destinations[dest]);
                companyDestinations.push(new CompanyServiceDestination(Number(Destinations[dest].split('@')[0])
                ,Destinations[dest].split('@')[1],Number(Destinations[dest].split('@')[2])));                
           }
           this.service.push(new Service(this.company.CompanyId,serviceId,servicename,servicedesc,companyDestinations,this.company.CompanyName,servicetypeid));
           console.log(JSON.stringify(companyDestinations));         
        }
       this.isServiceSelected = true;
       console.log(JSON.stringify(this.service));
  }
  Cancel()
  { 
    this.isServiceSelected = false;
  }
  SelectServices(srve)
  {
       //console.log(srve.isApproved);
      // console.log(srve.CompanyId);
       //console.log(srve.ServiceId);
       var indx = this.companyservices.findIndex(x => x.CompanyServiceId == srve.ServiceId);
       console.log(indx);   
       if(indx >= 0)
       {
         this.companyservices.splice(indx,1);
       }     
       this.companyservices.push(new CompanyServices(srve.CompanyId,srve.ServiceId, srve.ServiceTypeId));
       console.log(JSON.stringify(this.companyservices));     
       
  }
  SelectServiceDestinations(dest)
  {
       //console.log(dest.isApproved);
       //console.log(dest.CompanyId);
       //console.log(dest.CompanyServiceDestId);
       var indx = this.companyServiceDestinations.findIndex(x => x.CompanyServiceDestId == dest.CompanyServiceDestId); 
       console.log(indx); 
       if(indx >= 0)
       {
         this.companyServiceDestinations.splice(indx,1);
       }     
       this.companyServiceDestinations.push(new CompanyServiceDestination(dest.CompanyServiceDestId,dest.CompanyServiceDest,dest.ServiceTypeId));
       //console.log(JSON.stringify(this.companyServiceDestinations)); 
      
  }
  approveCompanyServiceDestination() {
        //console.log(JSON.stringify(this.companyservices));   
        //console.log(JSON.stringify(this.companyServiceDestinations)); 
        var companyservicesstr = "";
         for (let srv in this.companyservices) {
             if(companyservicesstr != "") {
              companyservicesstr += "|"
             }
             companyservicesstr += String(this.companyservices[srv].CompanyServiceId)  + "#" + String(this.companyservices[srv].ServiceTypeId)
         }
         console.log(companyservicesstr);
        
         var companyservicesdeststr = "";
         
         for (let srvdest in this.companyServiceDestinations) {
             if(companyservicesdeststr != "")
              companyservicesdeststr += "|"
             companyservicesdeststr += String(this.companyServiceDestinations[srvdest].CompanyServiceDestId) + "#" + String(this.companyServiceDestinations[srvdest].ServiceTypeId);             
         }
         console.log(companyservicesdeststr);
         var result = this.companyservice.approveCompanyServiceDetails(companyservicesstr,companyservicesdeststr);
        this.showLoading();
        result.subscribe(data =>  this.companyservice.getCompanyDetailsForApproval(this.token,-1,-1,'').subscribe(
                       response => {
                            this.CompanyServicesList = response.recordset; console.log(JSON.stringify(response.recordset))
                              this.companyservice.getServiceTypes().subscribe(
                                  response => {
                                    this.serviceTypes = response.recordset; 
                                    console.log(JSON.stringify(response.recordset))
                                    this.isServiceSelected = false;
                                    this.hideLoading();
                                  },
                                 error=>  { 
                                   this.errorMessage = 'Unable to retrieve service types.';
                                   this.hideLoading(); 
                                  }
                               );    
                           },
                          error=>  { 
                            this.errorMessage = 'Unable to retrieve company services.';
                            this.hideLoading();
                           }
                      ));  
  }
  CompanySearch()
  {
     console.log(this.companyType);
     console.log(this.searchtext);
    this.companyservice.getCompanyDetailsForApproval(this.token,-1,this.companyType,this.searchtext).subscribe(
                       response => {this.CompanyServicesList = response.recordset; console.log(JSON.stringify(response.recordset))},
                          error=>  { this.errorMessage = 'Unable to retrieve company service details.' }
                      );  
  }
}
