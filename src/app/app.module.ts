import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCashboxesService } from './services/in-memory-cashboxes.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CashboxService } from './services/cashbox.service';
import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { CashboxDetailComponent } from './cashboxDetail/cashbox-detail.component';
import { OrderComponent } from './order/order.component';
import { InMemoryOrdersService } from './services/in-memory-orders.service';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryCashboxesService, { delay: 600 }),
    InMemoryWebApiModule.forRoot(InMemoryOrdersService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    CashboxesComponent,
    CashboxDetailComponent,
    OrderComponent,
  ],
  providers: [CashboxService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
