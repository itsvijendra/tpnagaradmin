import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Banner } from '../model/banner';
import { Headercontent } from '../model/headercontent';
import { BannerConfig } from '../model/banner-config';
import { BannerConfigDetail } from '../model/banner-config-detail';
import { ContentHeaders } from '../common/contentheaders';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BannerServices {
	private TOKEN_URL:string = 'http://localhost:5001/api/gettoken';
    private BASE_URL:string = 'http://localhost:5001/api/banner';
	private BASE_URL_BannerConfig:string = 'http://localhost:5001/api/bannerconfig/';
	private BASE_URL_BannerConfigDetail:string = 'http://localhost:5001/api/bannerconfigdetail/';
	private BASE_URL_GetCity:string = 'http://localhost:5001/api/getcity';
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
	getAllBanner(token){
		var headersvalue = this.contentHeaders.getHeaders(null);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });		
		return this.http.get(`${this.BASE_URL + '?token=' + token }`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getAllCity(token){		
		return this.http.get(`${this.BASE_URL_GetCity + '?token=' + token }`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	addBanner(body:Banner){
		console.log('adding banner details');
		console.log(JSON.stringify(body));
		var headersvalue = this.contentHeaders.getHeaders(null);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });			
		return this.http.post(`${this.BASE_URL + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}	

	updateBanner(body:Banner){
		console.log('updating banner details');
       var headersvalue = this.contentHeaders.getHeaders(null);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	

		return this.http.post(`${this.BASE_URL + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

   deleteBanner(BannerId:string){
 
        var headersvalue = this.contentHeaders.getHeaders([new Headercontent('x-access-token',localStorage.getItem('token'))]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	

		return this.http.delete(`${this.BASE_URL}${BannerId}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addBannerConfig(body:BannerConfig){
		console.log('adding banner config');
		console.log(JSON.stringify(body));
		 var headersvalue = this.contentHeaders.getHeaders([new Headercontent('x-access-token',localStorage.getItem('token'))]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	
		return this.http.post(`${this.BASE_URL_BannerConfig}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateBannerConfig(body:BannerConfig){
        console.log('updating banner config....');
        var headersvalue = this.contentHeaders.getHeaders([new Headercontent('x-access-token',localStorage.getItem('token'))]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	
		console.log(JSON.stringify(body));
		return this.http.post(`${this.BASE_URL_BannerConfig + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	deleteBannerConfig(BannerConfigId:string){
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.delete(`${this.BASE_URL_BannerConfig}${BannerConfigId}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	getAllBannerConfig(token){
		return this.http.get(`${this.BASE_URL_BannerConfig + '?token=' + token}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
    addBannerConfigDetail(body:BannerConfigDetail){
		console.log('adding banner config');
		console.log(JSON.stringify(body));
		 var headersvalue = this.contentHeaders.getHeaders([new Headercontent('x-access-token',localStorage.getItem('token'))]);
		console.log(JSON.stringify(headersvalue));
		let options = new RequestOptions({
        	headers: headersvalue			
        });	
		return this.http.post(`${this.BASE_URL_BannerConfigDetail + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	getAllBannerConfigDetail(token){
		return this.http.get(`${this.BASE_URL_BannerConfigDetail + '?token=' + token}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	updateBannerConfigDetail(body:BannerConfigDetail){
        console.log('updating banner config details');
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		console.log(JSON.stringify(body));
		return this.http.post(`${this.BASE_URL_BannerConfigDetail + '?token=' + localStorage.getItem('token')}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	deleteBannerConfigDetail(BannerConfigDetId:string){
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.delete(`${this.BASE_URL_BannerConfigDetail}${BannerConfigDetId}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
}
