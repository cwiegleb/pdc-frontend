import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cashbox } from '../models/cashbox';

@Injectable()
export class CashboxService {
  private cashboxesUrl = 'http://127.0.0.1:9002/cashboxes';  // URL to web api

  constructor(private http: Http) { }

  getCashboxes(): Promise<Array<Cashbox>> {
    return this.http
      .get(this.cashboxesUrl, )
      .toPromise()
      .then((response) => {
      return response.json() as Cashbox[];
      })
      .catch(this.handleError);
  }

  getCashbox(id: number): Promise<Cashbox> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `${this.cashboxesUrl}/${id}`;
    return this.http
        .get(url, { headers: headers })
        .toPromise().then(response => {
          return response.json() as Cashbox;
        })
        .catch(this.handleError);
  }

  save(cashbox: Cashbox): Promise<Cashbox> {
    if (cashbox.ID) {
      return this.put(cashbox);
    }
    return this.post(cashbox);
  }

  // Add new Cashbox
  private post(cashbox: Cashbox): Promise<Cashbox> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.cashboxesUrl, JSON.stringify(cashbox), { headers: headers })
      .toPromise()
      .then((res) => {
          cashbox.ID = +res.headers.get('location').match('.*\/([^\/#]*)(#.*|$)')[1];
          return cashbox;
        })
      .catch(this.handleError);
  }

  // Update existing Cashbox
  private put(cashbox: Cashbox): Promise<Cashbox> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.cashboxesUrl}/${cashbox.ID}`;

    return this.http
      .put(url, JSON.stringify(cashbox), { headers: headers })
      .toPromise()
      .then(() => cashbox)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
