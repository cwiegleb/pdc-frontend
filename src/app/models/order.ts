import { OrderLine } from './orderLine';

export class Order {
    id: number;
    cashboxId: number;
    name: string;
    orderLines: OrderLine[];
}
