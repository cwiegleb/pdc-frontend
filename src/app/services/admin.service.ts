import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {
    private dealersUrl = 'http://127.0.0.1:9003/dealers';
    private articlesUrl = 'http://127.0.0.1:9001/dealers/{{dealer-id}}/articles';

    constructor(private http: Http) {
    }

    // getDealers(): Promise<Array<Dealer>> {
    //     return this.http
    //         .get(this.dealersUrl)
    //         .toPromise()
    //         .then((response) => {
    //             return response.json() as Dealer[];
    //         })
    //         .catch(this.handleError);
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

