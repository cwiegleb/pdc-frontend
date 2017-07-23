import { OrderLine } from './orderLine';
import { OrderStatus } from './orderStatus';

export class Order {
    id: number;
    cashboxId: number;
    orderStatus: OrderStatus;
    orderLines: OrderLine[] = [];
}
