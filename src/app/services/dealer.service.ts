import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Dealer } from '../models/dealer';
import { Article } from '../models/article';

@Injectable()
export class DealerService {
    private dealersUrl = 'http://127.0.0.1:9003/dealers';
    private articlesUrl = 'http://127.0.0.1:9001/dealers/{{dealer-id}}/articles';

    constructor(private http: Http) {
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

    getDealerArticles(dealerId: number): Promise<Array<Article>>{
        return this.http
            .get(this.articlesUrl.replace('{{dealer-id}}', dealerId.toString()) )
            .toPromise()
            .then((response) => {
                console.log(response);
                return response.json() as Article[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
