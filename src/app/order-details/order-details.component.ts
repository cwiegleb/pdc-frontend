import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderLine } from '../models/orderLine';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { OrderStatus } from '../models/orderStatus';
import { DealerService } from '../services/dealer.service';
import { SelectComponent } from 'ng2-select-compat/ng2-select';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoMessageComponent } from '../modal-info-message/modal-info-message.component';
import { ModalContentInfo } from '../models/modalContentInfoMessage';
import { ngSelectModel } from '../models/ngSelectModel';
import { Article } from '../models/article';

@Component({
    selector: 'my-order-details',
    templateUrl: 'order-details.component.html',
    styleUrls: ['order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {

    order: Order;
    newOrderLine: OrderLine;
    totalAmount: number;
    error: any;

    dealers: ngSelectModel[] = [];
    articles: ngSelectModel[] = [];
    tempArticles: Article[] = [];
    orderStatusClosed: OrderStatus = OrderStatus.Closed;
    unknownDealer: number = 9999;
    unknownArticle: number = 9999;

    @ViewChild('dealerSelectId')
    private dealerSelectList: SelectComponent;

    @ViewChild('articleSelectId')
    private articleSelectList: SelectComponent;

    constructor(private orderService: OrderService,
                private dealerService: DealerService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if (params['order-details-ID'] !== undefined &&
                params['ID'] !== undefined) {
                const orderId = +params['order-details-ID'];
                const id = +params['ID'];
                this.orderService.getOrder(id, orderId)
                    .then(order => {
                        console.log(order);
                        this.order = order;
                        this.calculateOrderLine();
                    });
            } else {

                this.dealerService.getDealers()
                    .then(dealers => {

                        this.order = new Order();
                        this.order.CashboxID = +params['ID'];
                        this.order.OrderStatus = OrderStatus.Initial;

                        this.newOrderLine = new OrderLine;


                        dealers.map((item) => {
                            this.dealers.push({ id: item.ID, text: item.ExternalId });
                        });
                    });
            }

        });

    }

    addOrderLine() {
        console.log(this.newOrderLine.Price);
        this.newOrderLine.Price = +this.newOrderLine.Price;
        this.order.OrderLines.push(this.newOrderLine);
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
        this.calculateOrderLine();
    }

    deleteOrderLine(orderLine: OrderLine, event: any): void {
        this.order.OrderLines = this.order.OrderLines.filter(h => h !== orderLine);
        this.calculateOrderLine();
    }

    selectedDealer(event: any) {
        this.newOrderLine.DealerText = event.text;
        this.newOrderLine.DealerID = event.id;
        this.newOrderLine.Price = null;

        this.dealerService.getDealerArticles(this.newOrderLine.DealerID)
            .then(articles => {
                this.tempArticles = articles;
                this.articles = [];
                articles.map((item) => {
                    if (item.ID === 9999 ||
                        !this.order.OrderLines.some(element => element.ArticleID === item.ID)) {
                        this.articles.push({
                            id: item.ID,
                            text: item.Text + ', Größe ' + item.Size
                        });
                    }
                });
            });

        if (this.articleSelectList) {
            var activeItem = this.articleSelectList.activeOption;
            if (activeItem) {
                this.articleSelectList.remove(activeItem)
            }
        }
    }

    nextElement(event: any) {
        console.log(event);
        let element = event.srcElement.nextElementSibling; // get the sibling element
        if (element == null)  // check if its null
            return;
        else
            element.focus();   // focus if not null
    }

    selectedArticle(event: any) {
        this.newOrderLine.ArticleText = event.text;
        this.newOrderLine.ArticleID = event.id;
        if (event.id !== 9999) {
            this.newOrderLine.Price =
                this.tempArticles.filter(element => element.ID === event.id)[0].Costs;
            this.newOrderLine.Currency =
                this.tempArticles.filter(element => element.ID === event.id)[0].Currency;
        }

    }

    calculateOrderLine() {
        this.totalAmount = 0;
        this.order.OrderLines.forEach(item => {
            this.totalAmount += +item.Price;
        });
    }

    submitOrder() {
        this.order.OrderStatus = OrderStatus.Closed;
        this.orderService.save(this.order).then(order => {
            let modalInfoMessage: ModalContentInfo = {
                message: 'Bestellung aufgegeben mit Nr. ' + order.ID,
                backToHomeLocation: '/cashboxes',
                newLocation: this.route.toString()
            };
            this.openModal(modalInfoMessage);
        })
            .catch(error => this.error = error);
    }

    openModal(modalInfoMessage: ModalContentInfo) {
        let options: NgbModalOptions = {
            backdrop: 'static'
        };

        this.modalService.open(ModalInfoMessageComponent, options).componentInstance.modalContent =
            modalInfoMessage;
    }
}
