import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
    private ordersUrl = 'app/orders';  // URL to web api

    constructor(private http: Http) {
    }

    getOrders(id: number): Promise<Array<Order>> {
        return this.http
            .get(this.ordersUrl)
            .toPromise()
            .then((response) => {
                //return response.json().data as Order[];
                let orders: Order[] = response.json().data;
                return orders.filter(order => order.cashboxId === id);
            })
            .catch(this.handleError);
    }

    getOrder(id: number, orderId: number): Promise<Order> {
        return this.getOrders(id)
            .then(orders => {
                return orders.find(order => order.id === orderId && order.cashboxId === id);
            });
    }

    save(order: Order): Promise<Order> {
        if (order.id) {
            return this.put(order);
        }
        return this.post(order);
    }

    delete(order: Order): Promise<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = `${this.ordersUrl}/${order.id}`;

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
            .post(this.ordersUrl, JSON.stringify(order), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Order
    private put(order: Order): Promise<Order> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = `${this.ordersUrl}/${order.id}`;

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
