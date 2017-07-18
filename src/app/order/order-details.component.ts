import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderLine } from '../models/orderLine';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Dealer } from '../models/dealer';
import { DealerService } from '../services/dealer.service';
import { Dropdown } from '../models/dropdown';

@Component({
  selector: 'my-order-details',
  templateUrl: 'order-details.component.html',
  styleUrls: ['order-details.component.css']
})

export class OrderComponent implements OnInit {

  order: Order;
  newOrderLine: OrderLine;
  error: any;

  dealers: Dealer[];
  dealersDropdown: Dropdown[];

  constructor(
      private orderService: OrderService,
      private dealerService: DealerService,
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

    this.dealerService.getDealers()
        .then(dealers => {
          this.dealers = dealers;
        });
  }

  addOrderLine(){
    this.order.orderLines.push(this.newOrderLine);
    this.newOrderLine = new OrderLine();
  }

  selectedDealer(event: any){
    this.newOrderLine.dealer = event.text;
  }
}
