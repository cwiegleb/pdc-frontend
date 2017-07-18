import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Dealer } from '../models/dealer';

@Injectable()
export class DealerService {
    private dealersUrl = 'app/dealers';  // URL to web api

    constructor(private http: Http) {
    }

    getDealers(): Promise<Array<Dealer>> {
        return this.http
            .get(this.dealersUrl)
            .toPromise()
            .then((response) => {
                return response.json().data as Dealer[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
