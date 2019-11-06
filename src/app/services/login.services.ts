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
export class LoginService {
	//admin.tpnagar.co.in
 
    private LoginDetail_URL:string = 'http://localhost:5004/api/logindetails';
	private LoginStatus_URL:string = 'http://localhost:5004/api/loginstatustype';
	private ApproveLogin_URL:string = 'http://localhost:5004/api/approvelogindetails';
    constructor(
	        private http: Http,		
		    private contentHeaders:ContentHeaders
	) {}   
	getLoginStatusTypes(){
		var headersvalue = this.contentHeaders.getHeaders([]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });		
		return this.http.get(`${this.LoginStatus_URL+ "?searchtext=''" }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
    getLoginDetails(searchText){			
		return this.http.get(`${this.LoginDetail_URL + '?searchtext=' + searchText }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	approveLoginDetails(loginId,StatusId,BsEnabled){			
		return this.http.get(`${this.ApproveLogin_URL + '?loginid=' + loginId + '&statusid=' + StatusId + '&bsenabled=' + BsEnabled}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
}
