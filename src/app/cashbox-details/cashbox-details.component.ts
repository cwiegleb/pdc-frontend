import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Cashbox } from '../models/cashbox';
import { CashboxService } from '../services/cashbox.service';
import { ModalContentInfoMessage } from '../models/modalContentInfoMessage';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoMessageComponent } from '../modal-info-message/modal-info-message.component';

@Component({
  selector: 'my-cashbox-detail',
  templateUrl: 'cashbox-details.component.html',
  styleUrls: ['cashbox-details.component.css']
})
export class CashboxDetailComponent implements OnInit {

  cashbox: Cashbox;
  error: any;

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
            .then(cashbox => this.cashbox = cashbox);
      } else {
        this.cashbox = new Cashbox();
      }
    });
  }

  save(): void {
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


  openModal(modalInfoMessage: ModalContentInfoMessage){
    let options: NgbModalOptions = {
      backdrop: 'static'
    };

    this.modalService.open(ModalInfoMessageComponent, options).componentInstance.modalContent = modalInfoMessage;
}

}
