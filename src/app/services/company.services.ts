import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Banner } from '../model/banner';
import { Headercontent } from '../model/headercontent';
import { Company } from '../model/company';
import { Service } from '../model/service';
import { CompanyServiceApprovalContent } from '../model/companyserviceapprovalcontent';
import { ContentHeaders } from '../common/contentheaders';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CompanyService {
	//admin.tpnagar.co.in
    private TOKEN_URL:string = 'http://admin.tpnagar.co.in:5004/api/gettoken';
    private COMPANY_URL:string = 'http://admin.tpnagar.co.in:5004/api/companyandserviceapproval/';
	private COMPANY_MAIN_URL:string = 'http://admin.tpnagar.co.in:5004/api/company/';
	private API_MAIN_URL:string = 'http://admin.tpnagar.co.in:5004/api/';
	private Service_URL:string = 'http://admin.tpnagar.co.in:5004/api/servicetype/';
	private Service_City_Url: string = 'http://admin.tpnagar.co.in:5004/api/servicesitymapping/';
	private BASE_URL_GetCity:string = 'http://admin.tpnagar.co.in:5004/api/getcity';
    constructor(
	        private http: Http,		
		    private contentHeaders:ContentHeaders
	) {}
    getToken()
	{
		console.log('getting token')
		/*var headersvalue = this.contentHeaders.getHeaders([new Headercontent('userid','testapiresu'),new Headercontent('pwd','tsetapissapword') ]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue
			
        });
		console.log(JSON.stringify(options));
		
         return this.http.get(`${this.TOKEN_URL}`,options)
			.map((res:Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
		return null;
	}
	getServiceTypes(){
		var headersvalue = this.contentHeaders.getHeaders([]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });		
		return this.http.get(`${this.Service_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
    getCompanyDetailsForApproval(token, companyid, companytypeid, searchText){			
		return this.http.get(`${this.COMPANY_URL + '?companyid=' + companyid + '&companytypeid=' + companytypeid + '&searchtxt=' + searchText }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	approveCompanyServiceDetails(CompanyServicesString, CompanyServiceDestString){
		var headersvalue = this.contentHeaders.getHeaders([]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });
		let approvalcontent = new CompanyServiceApprovalContent(CompanyServicesString,CompanyServiceDestString);
		console.log(JSON.stringify(approvalcontent));
		console.log(JSON.stringify(options));	
		return this.http.post(`${this.COMPANY_URL}`,JSON.stringify(approvalcontent),options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getCompanyDetailsForAdmin(companyid, IsBranch, searchText){			
		return this.http.get(`${this.COMPANY_MAIN_URL + '?CompanyId=' + companyid + '&IsBranch=' + IsBranch + '&searchtxt=' + searchText }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	saveCompanyDetails(companyDetail, isNew)
	{
		if(isNew)
		{
			var headersvalue = this.contentHeaders.getHeaders([]);
			console.log(JSON.stringify(headersvalue));
			let options = new RequestOptions({
				headers: headersvalue			
			});
			return this.http.post(`${this.COMPANY_MAIN_URL}`,JSON.stringify(companyDetail),options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		}

	}
	saveServiceCityMapping(serviceCity)
	{
		var headersvalue = this.contentHeaders.getHeaders([]);
		console.log(JSON.stringify(serviceCity));
		let options = new RequestOptions({
				headers: headersvalue			
		});
		return this.http.post(`${this.Service_City_Url}`,JSON.stringify(serviceCity),options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		
	}
	saveNearByCity(nearByCityDetails)
	{
		var headersvalue = this.contentHeaders.getHeaders([]);
		console.log(JSON.stringify(nearByCityDetails));
		let options = new RequestOptions({
				headers: headersvalue			
		});
		return this.http.post(`${this.API_MAIN_URL + '/savenearbycity' }`,JSON.stringify(nearByCityDetails),options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));		
	}
	getCountry(){			
		return this.http.get(`${this.API_MAIN_URL + '/getcountry/'}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getState(CountryId){			
		return this.http.get(`${this.API_MAIN_URL + '/getstate/?CountryId=' + CountryId }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getCityByState(StateId){			
		return this.http.get(`${this.API_MAIN_URL + '/getcitybystate/?StateId=' + StateId }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getAllCity(){		
		return this.http.get(`${this.BASE_URL_GetCity + '?token=adsfadr' }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getArea(CityId){			
		return this.http.get(`${this.API_MAIN_URL + '/getcitybystate/?CityId=' + CityId }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getService(){			
		return this.http.get(`${this.API_MAIN_URL + '/getservicelist'}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getServiceDetails(CityId) {
		return this.http.get(`${this.API_MAIN_URL + '/getServiceDetails?CityId=' + CityId}`)
		.map((res:Response) => res.json())
	}
	getNearByCityDetails(CityId) {
		return this.http.get(`${this.API_MAIN_URL + '/getNearByCityDetails?CityId=' + CityId}`)
		.map((res:Response) => res.json())
	}

}
