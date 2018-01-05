import { DealerUploadService } from '../services/dealer-upload.service';
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
  success: string;
  formData: FormData;

  @ViewChild('fileInputDealerDetails')
  private fileInputDealerDetails;

  @ViewChild('fileInputDealerArticles')
  private fileInputDealerArticles;

  @ViewChild('dealerSelectId')
  private dealerSelectList: SelectComponent;

  constructor(
    private router: Router,
    private dealerService: DealerService,
    private dealerUploadService: DealerUploadService) { }

  ngOnInit() {
    this.formData = new FormData();
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
      .then(response => this.saveToFileSystem(response, `Auszahlung_${this.selectedDealerId}.pdf`, 'application/pdf'))
      .catch((err) => {
        this.error = err.statusText;
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

  public uploadData() {
    let fileBrowser = this.fileInputDealerDetails.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      this.formData.append('dealerDetails.csv', fileBrowser.files[0], 'dealerDetails.csv');
    }

    fileBrowser = this.fileInputDealerArticles.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.formData.append('dealerArticles.csv', fileBrowser.files[0], 'dealerArticles.csv');
    }

    this.dealerUploadService.uploadDealerDetails(this.formData).then((res) => {
      this.success = 'Anbieterdaten erfolgreich hochgeladen';
    }).catch((err) => {
      this.error = 'Keine Upload möglich, frag\' einfach Christian';
    })
  }
}
