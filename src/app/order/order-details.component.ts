import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderLine } from '../models/orderLine';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Dealer } from '../models/dealer';
import { DealerService } from '../services/dealer.service';
import { FormControl, Validators } from '@angular/forms';
import { Article } from '../models/article';

import { ViewChild } from '@angular/core';
import { SelectComponent } from 'ng2-select/ng2-select';

@Component({
  selector: 'my-order-details',
  templateUrl: 'order-details.component.html',
  styleUrls: ['order-details.component.css']
})

export class OrderComponent implements OnInit {

  order: Order;
  newOrderLine: OrderLine;
  error: any;
  priceFormControl: FormControl;

  dealers: Dealer[];
  articles: Article[];

  PRICE_REGEX = /^[0-9]*$/;

  @ViewChild('dealerSelectId')
  private dealerSelectList: SelectComponent;

  @ViewChild('articleSelectId')
  private articleSelectList: SelectComponent;

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

    this.priceFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.PRICE_REGEX)]);
  }

  addOrderLine(){
    this.order.orderLines.push(this.newOrderLine);
    this.newOrderLine = new OrderLine();

    if (this.dealerSelectList) {
      var activeItem = this.dealerSelectList.activeOption;
      if (activeItem) {
        this.dealerSelectList.remove(activeItem)
      }
    }

    if (this.articleSelectList) {
      var activeItem = this.articleSelectList.activeOption;
      if (activeItem) {
        this.articleSelectList.remove(activeItem)
      }
    }

    this.articles = [];

  }

  deleteOrderLine(orderLine: OrderLine, event: any): void{
    this.order.orderLines = this.order.orderLines.filter(h => h !== orderLine);
  }

  selectedDealer(event: any){
    this.newOrderLine.dealer = event.text;
    this.newOrderLine.dealerId = event.id;

    this.dealerService.getDealerArticles(this.newOrderLine.dealerId)
        .then(articles => this.articles = articles);
  }

  selectedArticle(event: any){
    this.newOrderLine.article = event.text;
    this.newOrderLine.articleId = event.id;
  }
}
