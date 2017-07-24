import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng2-select-compat';
import { MdInputModule } from '@angular/material';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCashboxesService } from './services/in-memory-data.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { CashboxDetailComponent } from './cashboxDetail/cashbox-detail.component';
import { OrderComponent } from './order/order-details.component';
import { OrderService } from './services/order.service';
import { DealerService } from './services/dealer.service';
import { CashboxService } from './services/cashbox.service';
import { ModalSuccessComponent } from './modal-success/modal-success.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    SelectModule,
    MdInputModule,
    InMemoryWebApiModule.forRoot(InMemoryCashboxesService, { delay: 600 }),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CashboxesComponent,
    CashboxDetailComponent,
    OrderComponent,
    ModalSuccessComponent,
  ],
  providers: [CashboxService, OrderService, DealerService],
  bootstrap: [AppComponent],
  entryComponents: [ModalSuccessComponent]
})
export class AppModule { }
