import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cashbox } from '../models/cashbox';

@Injectable()
export class CashboxService {
  private cashboxesUrl = 'app/cashboxes';  // URL to web api

  constructor(private http: Http) { }

  getCashboxes(): Promise<Array<Cashbox>> {
    return this.http
      .get(this.cashboxesUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as Cashbox[];
      })
      .catch(this.handleError);
  }

  getCashbox(id: number): Promise<Cashbox> {
    return this.getCashboxes()
      .then(cashboxes => cashboxes.find(cashbox => cashbox.id === id));
  }

  save(cashbox: Cashbox): Promise<Cashbox> {
    if (cashbox.id) {
      return this.put(cashbox);
    }
    return this.post(cashbox);
  }

  delete(cashbox: Cashbox): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.cashboxesUrl}/${cashbox.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Cashbox
  private post(cashbox: Cashbox): Promise<Cashbox> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.cashboxesUrl, JSON.stringify(cashbox), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Cashbox
  private put(cashbox: Cashbox): Promise<Cashbox> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.cashboxesUrl}/${cashbox.id}`;

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
