import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Dealer } from '../models/dealer';
import { Article } from '../models/article';

@Injectable()
export class DealerService {
    private dealersUrl = 'http://127.0.0.1:9003/dealers';
    private articlesUrl = 'http://127.0.0.1:9001/dealers/{{dealer-id}}/articles';
    public dealersInvoicesUrl = 'http://127.0.0.1:9003/dealers_invoices';

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
