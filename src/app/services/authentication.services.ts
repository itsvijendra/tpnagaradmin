import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ContentHeaders } from '../common/contentheaders';
import { Headercontent } from '../model/headercontent';
import { User } from '../model/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Authentication {
  
  private TOKEN_URL:string = 'http://admin.tpnagar.co.in:5004/api/gettoken';
  private AUTH_URL:string = 'http://admin.tpnagar.co.in:5004/api/authenticateuser';
    constructor(
	        private http: Http,		
		    private contentHeaders:ContentHeaders
	) {}

     login(body:User) {  
        var headersvalue = this.contentHeaders.getHeaders(null);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	
        console.log(JSON.stringify(body));
         return this.http.post(`${this.AUTH_URL + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));  

    }
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



    logout() {

        // remove user from local storage to log user out

        localStorage.clear();
		

    }
}
