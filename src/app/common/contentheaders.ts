import {Headers} from '@angular/http'
import { Injectable } from '@angular/core';
import { Headercontent } from '../model/headercontent';

@Injectable()
export class ContentHeaders {
    private headersvalue;
    private headercontent : Headercontent; 
    getHeaders(headerContents)
    {
        this.headersvalue = new Headers();
        this.headersvalue.append('Content-Type', 'application/json');
        if(headerContents != null)
        {
            for(let header of headerContents)
            {
                this.headercontent = header;
                this.headersvalue.append(this.headercontent.Key, this.headercontent.Value);
            }
        }
        console.log(this.headersvalue);
        return this.headersvalue
    }


}
