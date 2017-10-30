import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'my-order-list',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor( private orderService: OrderService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['ID'] !== undefined ) {
        const id = +params['ID'];
        this.orderService.getOrders(id)
            .then(orders => {
              console.log(orders);
              this.orders = orders;
            });
      } else {
        // TODO
      }
    });
  }
}
