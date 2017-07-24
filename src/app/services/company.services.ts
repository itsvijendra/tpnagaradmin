import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Banner } from '../model/banner';
import { Headercontent } from '../model/headercontent';
import { Company } from '../model/company';
import { Service } from '../model/service';
import { ContentHeaders } from '../common/contentheaders';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CompanyService {
    private TOKEN_URL:string = 'http://localhost:5001/api/gettoken';
    private COMPANY_URL:string = 'http://localhost:5001/api/companyandserviceapproval';
    constructor(
	        private http: Http,		
		    private contentHeaders:ContentHeaders
	) {}
    getToken()
	{
		console.log('getting token')
		var headersvalue = this.contentHeaders.getHeaders([new Headercontent('userid','testapiresu'),new Headercontent('pwd','tsetapissapword') ]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue
			
        });
		console.log(JSON.stringify(options));
		
         return this.http.get(`${this.TOKEN_URL}`,options)
			.map((res:Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
    getCompanyDetailsForApproval(token, companyid, companytypeid, searchText){
		var headersvalue = this.contentHeaders.getHeaders([new Headercontent('x-access-token',localStorage.getItem('token'))]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });		
		return this.http.get(`${this.COMPANY_URL + '?companyid=' + companyid + '&companytypeid=' + companytypeid + '&searchtxt=' + searchText }`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	approveCompanyServiceDetails(CompanyServicesString, CompanyServiceDestString){
		var headersvalue = this.contentHeaders.getHeaders([
		 	new Headercontent('CompanyServicesString',CompanyServicesString)
		   ,new Headercontent('CompanyServiceDestString',CompanyServiceDestString)
		   ,new Headercontent('x-access-token',localStorage.getItem('token'))
		]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue
			
        });
		console.log(JSON.stringify(options));	
		return this.http.post(`${this.COMPANY_URL}`,"",options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

}
