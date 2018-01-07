import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    orderStatusClosed: OrderStatus = OrderStatus.Closed;
    unknownDealer = 9999;
    unknownArticle = 9999;

    @ViewChild('btnAddOrderLine')
    private btnAddOrderLineElementRef: ElementRef;

    @ViewChild('selectDealerId')
    private dealerSelectList: SelectComponent;

    @ViewChild('inputArticleId')
    private inputArticleIdElementRef: ElementRef;

    @ViewChild('inputPrice')
    private inputPriceElementRef: ElementRef;

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
        this.newOrderLine.Price = +this.newOrderLine.Price;
        this.order.OrderLines.push(this.newOrderLine);
        this.newOrderLine = new OrderLine();

        if (this.dealerSelectList) {
            const activeItem = this.dealerSelectList.activeOption;
            if (activeItem) {
                this.dealerSelectList.remove(activeItem)
            }
        }

        setTimeout(() => {
            this.dealerSelectList
            .element
            .nativeElement
            .querySelector('.ui-select-toggle')
            .dispatchEvent(new Event('click'));
        });

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
        setTimeout(() => {this.inputArticleIdElementRef.nativeElement.focus()});
        this.dealerSelectList.clickedOutside();
    }

    nextElement(type: string) {
        switch (type) {
            case 'article':
                setTimeout(() => {this.inputArticleIdElementRef.nativeElement.focus()});
                break;
            case 'price':
                setTimeout(() => {this.inputPriceElementRef.nativeElement.focus()});
                break;
            default:
            this.error = 'Invalid Input';
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
            const modalInfoMessage: ModalContentInfo = {
                message: 'Bestellung aufgegeben mit Nr. ' + order.ID,
                backToHomeLocation: '/cashboxes',
                newLocation: this.route.toString()
            };
            this.openModal(modalInfoMessage);
        })
            .catch(error => {
                this.order.OrderStatus = OrderStatus.Initial;
                this.error = error});
    }

    openModal(modalInfoMessage: ModalContentInfo) {
        const options: NgbModalOptions = {
            backdrop: 'static'
        };

        this.modalService.open(ModalInfoMessageComponent, options).componentInstance.modalContent =
            modalInfoMessage;
    }
}
