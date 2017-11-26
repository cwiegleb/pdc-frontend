import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealerService } from '../services/dealer.service';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  error: string;

  constructor(
    private router: Router,
    private dealerService: DealerService) { }

  ngOnInit() {
  }

  getDealersInvoinces() {
    this.dealerService.getDealersInvoices()
      .then(response => this.checkDealersInvoicesResponse(response))
      .then(response => this.saveToFileSystem(response))
      .catch((err) => {
        this.error = err.statusText;
      });
  }

  private saveToFileSystem(response) {
    const filename = 'AnbieterAuszahlungen.zip'
    const blob = new Blob([response._body], { type: 'application/zip' });
    saveAs(blob, filename);
  }

  private checkDealersInvoicesResponse(response) {
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
}
