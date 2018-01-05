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
  cashboxes: Cashbox[] = [];
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
      .then(cashboxes => {
        cashboxes.forEach(item => {
          item.ValidFromDate = new Date(item.ValidFromDate);
          item.ValidToDate = new Date(item.ValidToDate);
          this.cashboxes.push(item);
        });
        })
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


  ngOnInit(): void {
    this.currentDate = new Date();
    this.getCashboxes();
  }

  onSelect(cashbox: Cashbox): void {
    this.selectedCashbox = cashbox;
    this.addingCashbox = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/cashbox-details', this.selectedCashbox.ID]);
  }
}
