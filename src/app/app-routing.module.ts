import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { CashboxDetailComponent } from './cashboxDetail/cashbox-detail.component';
import { OrderComponent } from './order/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/cashboxes', pathMatch: 'full' },
  { path: 'cashbox-detail/:id', component: CashboxDetailComponent },
  { path: 'cashbox-detail', component: CashboxDetailComponent },
  { path: 'cashboxes', component: CashboxesComponent },
  { path: 'cashbox-detail/:id/order/:order-id', component: OrderComponent},
  { path: 'cashbox-detail/:id/order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
