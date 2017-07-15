import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderLine } from '../models/orderLine';

@Component({
  selector: 'my-order-details',
  templateUrl: 'order-details.component.html',
  styleUrls: ['order-details.component.css']
})
export class OrderComponent implements OnInit {

  order: Order;
  newOrderLine: OrderLine;
  error: any;

  constructor(
      private orderService: OrderService,
      private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['order-id'] !== undefined && params['id'] !== undefined ) {
        const orderId = +params['order-id'];
        const id = +params['id'];
        this.orderService.getOrder(id, orderId)
            .then(order => this.order = order);
      } else {
        this.order = new Order();
      }
    });
    this.newOrderLine = new OrderLine;
  }

  addOrderLine(){
    this.order.orderLines.push(this.newOrderLine);
    this.newOrderLine = new OrderLine();
  }

}
