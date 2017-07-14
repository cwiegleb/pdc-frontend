import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Cashbox } from '../models/cashbox';
import { CashboxService } from '../services/cashbox.service';

@Component({
  selector: 'my-cashbox-detail',
  templateUrl: 'cashbox-detail.component.html',
  styleUrls: ['cashbox-detail.component.css']
})
export class CashboxDetailComponent implements OnInit {
  @Input() cashbox: Cashbox;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private cashboxService: CashboxService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.cashboxService.getCashbox(id)
            .then(cashbox => this.cashbox = cashbox);
      } else {
        this.navigated = false;
        this.cashbox = new Cashbox();
      }
    });
  }

  save(): void {
    this.cashboxService
        .save(this.cashbox)
        .then(cashbox => {
          this.cashbox = cashbox; // saved cashbox, w/ id if new
          this.goBack(cashbox);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedCashbox: Cashbox = null): void {
    this.close.emit(savedCashbox);
    if (this.navigated) { window.history.back(); }
  }
}
