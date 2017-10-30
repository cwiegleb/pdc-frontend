import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { CashboxDetailComponent } from './cashbox-details/cashbox-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/cashboxes', pathMatch: 'full' },
  { path: 'cashbox-details/:ID', component: CashboxDetailComponent },
  { path: 'cashbox-details', component: CashboxDetailComponent },
  { path: 'cashboxes', component: CashboxesComponent },
  { path: 'cashbox-details/:ID/order/:order-details-ID', component: OrderDetailsComponent},
  { path: 'cashbox-details/:ID/order', component: OrderDetailsComponent},
  { path: 'cashbox-details/:ID/orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
