import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
    private ordersUrl = 'http://127.0.0.1:9004/orders/cashboxes/{{cashbox-ID}}';  // URL to web api
    private orderUrl = 'http://127.0.0.1:9004/orders/{{order-id}}cashboxes/{{cashbox-ID}}';  // URL to web api
    constructor(private http: Http) {
    }

    getOrders(id: number): Promise<Array<Order>> {
        return this.http
            .get(this.ordersUrl.replace('{{cashbox-ID}}', id.toString()))
            .toPromise()
            .then((response) => {
                const orders: Order[] = response.json();
                return orders.filter(order => order.CashboxID === id);
            })
            .catch(this.handleError);
    }

    getOrder(id: number, orderId: number): Promise<Order> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = this.orderUrl
            .replace('{{cashbox-ID}}',
                id.toString())
            .replace('{{order-ID}}',
                orderId.toString());

        return this.http
            .get(url, { headers: headers })
            .toPromise().then(response => {
                return response.json() as Order;
            })
            .catch(this.handleError);
    }

    save(order: Order): Promise<Order> {
        if (order.ID) {
            return this.put(order);
        }
        return this.post(order);
    }

    delete(order: Order): Promise<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = this.orderUrl
            .replace('{{cashbox-ID}}',
                order.CashboxID.toString())
            .replace('{{order-ID}}',
                order.ID.toString());

        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }

    // Add new Order
    private post(order: Order): Promise<Order> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.ordersUrl.replace('{{cashbox-ID}}',
                order.CashboxID.toString()), JSON.stringify(order), { headers: headers })
            .toPromise()
            .then((res) => {
                order.ID = +res.headers.get('location').match('(\/orders\/)([a-zA-Z0-9]*)')[2];
                return order;
            })
            .catch(this.handleError);
    }

    // Update existing Order
    private put(order: Order): Promise<Order> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = this.orderUrl
            .replace('{{cashbox-ID}}',
                order.CashboxID.toString())
            .replace('{{order-ID}}',
                order.ID.toString());

        return this.http
            .put(url, JSON.stringify(order), { headers: headers })
            .toPromise()
            .then(() => order)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
