import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cashbox } from '../models/cashbox';
import { CashboxService } from '../services/cashbox.service';

@Component({
  selector: 'my-cashboxes',
  templateUrl: 'cashboxes.component.html',
  styleUrls: ['cashboxes.component.css']
})
export class CashboxesComponent implements OnInit {
  cashboxes: Cashbox[];
  selectedCashbox: Cashbox;
  addingCashbox = false;
  error: any;
  currentDate: Date;

  constructor(
    private router: Router,
    private cashboxService: CashboxService) { }

  getCashboxes(): void {
    this.cashboxService
      .getCashboxes()
      .then(cashboxes => this.cashboxes = cashboxes)
      .catch(error => this.error = error);
  }

  addCashbox(): void {
    this.addingCashbox = true;
    this.selectedCashbox = null;
  }

  close(savedHero: Cashbox): void {
    this.addingCashbox = false;
    if (savedHero) { this.getCashboxes(); }
  }

  deleteCashbox(cashbox: Cashbox, event: any): void {
    event.stopPropagation();
    this.cashboxService
      .delete(cashbox)
      .then(res => {
        this.cashboxes = this.cashboxes.filter(h => h !== cashbox);
        if (this.selectedCashbox === cashbox) { this.selectedCashbox = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.getCashboxes();
  }

  onSelect(cashbox: Cashbox): void {
    this.selectedCashbox = cashbox;
    this.addingCashbox = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/cashbox-details', this.selectedCashbox.id]);
  }
}
