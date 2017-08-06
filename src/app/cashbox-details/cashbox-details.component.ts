import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Cashbox } from '../models/cashbox';
import { CashboxService } from '../services/cashbox.service';
import { ModalContentInfoMessage } from '../models/modalContentInfoMessage';
import { NgbModalOptions, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoMessageComponent } from '../modal-info-message/modal-info-message.component';

@Component({
  selector: 'my-cashbox-detail',
  templateUrl: 'cashbox-details.component.html',
  styleUrls: ['cashbox-details.component.css']
})
export class CashboxDetailComponent implements OnInit {

  cashbox: Cashbox;
  error: any;

  validFromDate: NgbDateStruct;
  validToDate: NgbDateStruct;

  constructor(
    private cashboxService: CashboxService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.cashboxService.getCashbox(id)
            .then(cashbox => {
              this.cashbox = cashbox;
              this.validFromDate = this.convertDateToDatepicker(this.cashbox.validFromDate);
              this.validToDate = this.convertDateToDatepicker(this.cashbox.validToDate);
            });
      } else {
        this.cashbox = new Cashbox();
      }
    });
  }

  save(): void {
    this.cashbox.validFromDate = this.convertDatepickerToDate(this.validFromDate);
    this.cashbox.validToDate = this.convertDatepickerToDate(this.validToDate);

    if(this.cashbox.validFromDate && this.cashbox.validToDate && this.cashbox.validToDate < this.cashbox.validFromDate) {
      this.error = 'Invalid date combination';
      return;
    }

    this.cashboxService
        .save(this.cashbox)
        .then(cashbox => {
          this.cashbox = cashbox; // saved cashbox, w/ id if new
          let modalInfoMessage: ModalContentInfoMessage = {
            message: 'Cashbox created with Id ' + cashbox.id
          };
          this.openModal(modalInfoMessage);
        })
        .catch(error => this.error = error);
  }

  convertDateToDatepicker(d: Date): NgbDateStruct {
    let date = new Date(d);
    if(date) {
      return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
    } else { return null;}
  }

  convertDatepickerToDate(datepicker: NgbDateStruct): Date {
    if(datepicker) {
      return new Date(datepicker.year, datepicker.month - 1, datepicker.day);
    } else { return null;}
  }

  openModal(modalInfoMessage: ModalContentInfoMessage){
    let options: NgbModalOptions = {
      backdrop: 'static'
    };

    this.modalService.open(ModalInfoMessageComponent, options).componentInstance.modalContent = modalInfoMessage;
  }
}
