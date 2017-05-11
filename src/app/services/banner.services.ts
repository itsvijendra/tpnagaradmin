import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Banner } from '../model/banner';
import { BannerConfig } from '../model/banner-config';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BannerServices {
    private BASE_URL:string = 'http://localhost:5001/api/banner/';
	private BASE_URL_BannerConfig:string = 'http://localhost:5001/api/bannerconfig/';
	constructor(
	        private http: Http
	) { }

	getAllBanner(){
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addBanner(body:Banner){
		console.log('adding banner details');
		console.log(JSON.stringify(body));
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json' }) 
        });
		return this.http.post(`${this.BASE_URL}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}	

	updateBanner(body:Banner){
		console.log('updating banner details');
        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.post(`${this.BASE_URL}${body['BannerId']}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

   deleteBanner(BannerId:string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.delete(`${this.BASE_URL}${BannerId}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addBannerConfig(body:BannerConfig){
		console.log('adding banner config');
		console.log(JSON.stringify(body));
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json' }) 
        });
		return this.http.post(`${this.BASE_URL_BannerConfig}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateBannerConfig(body:BannerConfig){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.put(`${this.BASE_URL_BannerConfig}${body['BannerConfigId']}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	getAllBannerConfig(){
		return this.http.get(`${this.BASE_URL_BannerConfig}`)
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

}
