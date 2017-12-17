import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Dealer } from '../models/dealer';
import { Article } from '../models/article';
import { environment } from '../../environments/environment'

@Injectable()
export class DealerService {
    private dealersUrl = `${environment.serviceEndpointDealer}/dealers`;
    private articlesUrl = `${environment.serviceEndpointArticle}/articles/dealers/{{dealer-id}}`;
    public dealersInvoicesUrl = `${environment.serviceEndpointDealer}/dealers-invoices`;

    constructor(private http: Http) {
    }

    getDealerInvoices(dealerId: string): Promise<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/pdf');
        return this.http
            .get(`${this.dealersUrl}/${dealerId}/invoice`, { headers: headers })
            .toPromise()
            .then((response) => {
                return response
            })
            .catch(this.handleError);
    }

    getDealersInvoices(): Promise<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/zip');
        return this.http
            .get(this.dealersInvoicesUrl, { headers: headers })
            .toPromise()
            .then((response) => {
                return response
            })
            .catch(this.handleError);
    }

    getDealers(): Promise<Array<Dealer>> {
        return this.http
            .get(this.dealersUrl)
            .toPromise()
            .then((response) => {
                return response.json() as Dealer[];
            })
            .catch(this.handleError);
    }

    getDealerArticles(dealerId: number): Promise<Array<Article>> {
        return this.http
            .get(this.articlesUrl.replace('{{dealer-id}}', dealerId.toString()))
            .toPromise()
            .then((response) => {
                return response.json() as Article[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
