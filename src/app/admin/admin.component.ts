import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectComponent } from 'ng2-select-compat/ng2-select';
import { ngSelectModel } from '../models/ngSelectModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DealerService } from '../services/dealer.service';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers } from '@angular/http';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedDealerId: string;
  dealers: ngSelectModel[] = [];
  error: string;

  @ViewChild('fileInputDealerDetails')
  private fileInput;

  @ViewChild('dealerSelectId')
  private dealerSelectList: SelectComponent;

  constructor(
    private router: Router,
    private dealerService: DealerService) { }

  ngOnInit() {

    this.dealerService.getDealers()
      .then(dealers => {
        dealers.map((item) => {
          this.dealers.push({ id: item.ID, text: item.ExternalId });
        });
      });
  }

  getDealersInvoices() {
    this.dealerService.getDealersInvoices()
      .then(response => this.checkResponse(response))
      .then(response => this.saveToFileSystem(response, 'Auszahlungen.zip', 'application/zip'))
      .catch((err) => {
        this.error = err.statusText;
      });
  }

  getDealerInvoices() {
    this.dealerService.getDealerInvoices(this.selectedDealerId)
      .then(response => this.checkResponse(response))
      .then(response => this.saveToFileSystem(response, `${this.selectedDealerId}_Auszahlung.pdf`, 'application/pdf'))
      .catch((err) => {
        switch (err.status) {
          case 404: {
            this.error = 'Keine Anbieterdaten verfügbar';
            break;
          }
          default: {
            this.error = 'Interner Fehler';
          }
        }
      });
  }

  selectedDealer(event: any) {
    this.selectedDealerId = event.id;
  }


  private saveToFileSystem(response, filename: string, applicationType: string) {
    const blob = new Blob([response._body], { type: applicationType });
    saveAs(blob, filename);
  }

  private checkResponse(response) {
    switch (response.status) {
      case 200: {
        return response;
      }
      case 204: {
        throw new HttpErrorResponse({
          status: 204,
          statusText: 'Keine Auszahlungen verfügbar'
        });
      }
      default: {
        throw new HttpErrorResponse({
          status: 500,
          statusText: 'Interner Fehler'
        });
      }
    }
  }

  public uploadDealerDetails() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('dealerDetails.csv', fileBrowser.files[0]);
      // TODO Send formData
    }
  }

}
