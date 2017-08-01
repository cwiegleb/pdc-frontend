import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'my-order-total-amount',
  templateUrl: './order-total-amount.component.html',
  styleUrls: ['./order-total-amount.component.css']
})
export class OrderTotalAmountComponent implements OnInit {


  @Input()
  order: Order;

  totalAmount: number;

  constructor() { }

  ngOnInit() {
    this.calculateOrderLine();
  }

  calculateOrderLine(){
    this.totalAmount = 0;
    this.order.orderLines.forEach(item => {
      this.totalAmount += +item.price;
    });
  }
}
