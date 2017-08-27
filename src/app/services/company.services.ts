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
    private TOKEN_URL:string = 'http://localhost:5001/api/gettoken';
    private COMPANY_URL:string = 'http://localhost:5001/api/companyandserviceapproval/';
	private Service_URL:string = 'http://localhost:5001/api/servicetype/';
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

}
