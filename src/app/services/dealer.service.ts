import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Dealer } from '../models/dealer';
import { Article } from '../models/article';

@Injectable()
export class DealerService {
    private dealersUrl = 'app/dealers';  // URL to web api
    private articlesUrl = 'app/articles'; // URL to web api

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

    getDealerArticles(dealerId: number): Promise<Array<Article>>{
        return this.http
            .get(this.articlesUrl + '?dealerId='+dealerId)
            .toPromise()
            .then((response) => {
                return response.json().data as Article[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
