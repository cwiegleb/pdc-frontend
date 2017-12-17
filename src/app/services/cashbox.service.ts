import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cashbox } from '../models/cashbox';
import { CashboxAccounting } from '../models/cashboxAccounting';
import { environment } from '../../environments/environment'

@Injectable()
export class CashboxService {
  private cashboxesUrl = `${environment.serviceEndpointCashbox}/cashboxes`;

  constructor(private http: Http) { }

  getAccounting(id: number): Promise<Array<CashboxAccounting>> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = `${this.cashboxesUrl}/${id}/accounting`;
    return this.http
        .get(url, { headers: headers })
        .toPromise().then(response => {
          return response.json() as CashboxAccounting[];
        })
        .catch(this.handleError);
  }

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
