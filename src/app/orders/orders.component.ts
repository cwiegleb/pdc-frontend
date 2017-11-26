import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { CashboxAccounting } from '../models/cashboxAccounting';
import { CashboxService } from '../services/cashbox.service';

@Component({
    selector: 'my-order-list',
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.css']
})
export class OrdersComponent implements OnInit {

    orders: CashboxAccounting[];
    totalAmountCashbox: number;

    constructor(private cashboxService: CashboxService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.totalAmountCashbox = 0;
        this.route.params.forEach((params: Params) => {
            if (params['ID'] !== undefined) {
                const id = +params['ID'];
                this.cashboxService.getAccounting(id)
                    .then(orders => {
                        console.log(orders);
                        this.orders = orders;
                        this.orders.forEach(item => {
                            this.totalAmountCashbox = this.totalAmountCashbox + item.TotalAmount;
                        })
                    });
            } else {
                // TODO
            }
        });
    }
}
