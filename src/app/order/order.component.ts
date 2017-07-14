import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'my-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
      private orderService: OrderService,
      private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.orderService.getOrder(id)
            .then(order => this.order = order);
      } else {
        this.navigated = false;
        this.order = new Order();
      }
    });
  }



}
