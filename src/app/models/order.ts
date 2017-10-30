import { OrderLine } from './orderLine';
import { OrderStatus } from './orderStatus';

export class Order {
    ID: number;
    CashboxID: number;
    OrderStatus: OrderStatus;
    CreationDate: Date;
    OrderLines: OrderLine[] = [];
}
