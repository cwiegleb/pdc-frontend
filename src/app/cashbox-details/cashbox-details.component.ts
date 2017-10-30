import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cashbox } from '../models/cashbox';
import { CashboxService } from '../services/cashbox.service';
import { ModalContentInfo } from '../models/modalContentInfoMessage';
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
    success: any;

    validFromDate: NgbDateStruct;
    validToDate: NgbDateStruct;

    constructor(private cashboxService: CashboxService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['ID'] !== undefined) {
                const id = +params['ID'];
                this.cashboxService.getCashbox(id)
                    .then(cashbox => {
                        this.cashbox = cashbox;
                        this.validFromDate =
                            this.convertDateToDatepicker(this.cashbox.ValidFromDate);
                        this.validToDate = this.convertDateToDatepicker(this.cashbox.ValidToDate);
                    });
            } else {
                this.cashbox = new Cashbox();
            }
        });
    }

    save(): void {
        this.cashbox.ValidFromDate = this.convertDatepickerToDate(this.validFromDate);
        this.cashbox.ValidToDate = this.convertDatepickerToDate(this.validToDate);

        if (this.cashbox.ValidFromDate && this.cashbox.ValidToDate &&
            this.cashbox.ValidToDate < this.cashbox.ValidFromDate) {
            this.error = 'Versuch\'s noch einmal. Keine gültige Eingabe';
            return;
        }

        this.cashboxService
            .save(this.cashbox)
            .then(() => {
                let modalInfoMessage: ModalContentInfo = {
                    message: 'Kasse angelegt / aktualisiert mit Nr. ' + this.cashbox.ID,
                    backToHomeLocation: '/cashboxes',
                    newLocation: '/cashbox-details'
                };
                this.openModal(modalInfoMessage);
            })
            .catch(error => this.error = error);
    }

    convertDateToDatepicker(d: Date): NgbDateStruct {
        let date = new Date(d);
        if (date) {
            return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
        } else {
            return null;
        }
    }

    convertDatepickerToDate(datepicker: NgbDateStruct): Date {
        if (datepicker) {
            return new Date(datepicker.year, datepicker.month - 1, datepicker.day);
        } else {
            return null;
        }
    }

    openModal(modalInfoMessage: ModalContentInfo) {
        let options: NgbModalOptions = {
            backdrop: 'static'
        };

        this.modalService.open(ModalInfoMessageComponent, options).componentInstance.modalContent =
            modalInfoMessage;
    }
}
