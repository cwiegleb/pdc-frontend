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
import { CashboxDetailComponent } from './cashbox-details/cashbox-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderService } from './services/order.service';
import { DealerService } from './services/dealer.service';
import { CashboxService } from './services/cashbox.service';
import { ModalInfoMessageComponent } from './modal-info-message/modal-info-message.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderTotalAmountComponent } from './order-total-amount/order-total-amount.component';

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
    OrderDetailsComponent,
    ModalInfoMessageComponent,
    OrdersComponent,
    OrderTotalAmountComponent,
  ],
  providers: [CashboxService, OrderService, DealerService],
  bootstrap: [AppComponent],
  entryComponents: [ModalInfoMessageComponent]
})
export class AppModule { }
