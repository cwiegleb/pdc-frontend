import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdAutocompleteModule} from '@angular/material';
import { SelectModule } from 'ng2-select';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCashboxesService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CashboxService } from './services/cashbox.service';
import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { CashboxDetailComponent } from './cashboxDetail/cashbox-detail.component';
import { OrderComponent } from './order/order-details.component';
import { OrderService } from './services/order.service';
import { DealerService } from './services/dealer.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    MdAutocompleteModule,
    BrowserAnimationsModule,
    SelectModule,
    InMemoryWebApiModule.forRoot(InMemoryCashboxesService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    CashboxesComponent,
    CashboxDetailComponent,
    OrderComponent,
  ],
  providers: [CashboxService, OrderService, DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
