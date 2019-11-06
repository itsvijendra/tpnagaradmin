import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ContentHeaders } from '../common/contentheaders';
import { Headercontent } from '../model/headercontent';
import { User } from '../model/user';
import { UserAccess } from '../model/useraccess';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Authentication {  
  private user: User = new User(); 
  private TOKEN_URL:string = 'http://localhost:5004/api/gettoken';
  private AUTH_URL:string = 'http://localhost:5004/api/authenticateuser';
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
			.map((res:Response) =>
			 { 
				this.setUserDetail(res.json().recordset);
				//localStorage.setItem('currentuser', JSON.stringify(res.json().recordset));
				//console.log(JSON.stringify(this.userdet));
			 })
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));  

	}
	setUserDetail(userdetails)
	{		
		for(let usr in userdetails) { 
		  // alert(JSON.stringify(userdetails[usr].UserName));         
		   this.user.UserName = userdetails[usr].UserName;
		   //alert(JSON.stringify(userdetails[usr].IsValidUser));   
		   this.user.IsValidUser =  userdetails[usr].IsValidUser;
		   this.user.CityList = userdetails[usr].CityList; 
		   //alert(JSON.stringify(userdetails[usr]));	
		   var uaccess = userdetails[usr].UserAccess;
		   var usrAccesses: UserAccess[] = [];
		   if(uaccess != null && uaccess != '')
		   {
			   var uaccesses = uaccess.split('|');
			   for (let uacss in uaccesses) {
				   //alert(JSON.stringify(uaccesses[uacss]));
				   var usrAccess = 	new UserAccess(String(uaccesses[uacss]).split('##')[0],String(uaccesses[uacss]).split('##')[1]);
				  // alert(JSON.stringify(usrAccess));
				   usrAccesses.push(usrAccess);
			   }
			   this.user.userAccess = usrAccesses;
		   }
		}
		//alert(JSON.stringify(this.user));	
		localStorage.setItem('currentuser', JSON.stringify(this.user));	
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
