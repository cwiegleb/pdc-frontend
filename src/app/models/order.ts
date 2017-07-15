import { OrderLine } from './orderLine';

export class Order {
    id: number;
    cashboxId: number;
    orderLines: OrderLine[];
}
