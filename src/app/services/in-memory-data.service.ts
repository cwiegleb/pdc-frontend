export class InMemoryCashboxesService {
  createDb() {
    const cashboxes = [
      { id: 11, name: 'Casbbox 1' },
      { id: 12, name: 'Casbbox 2' },
    ];

    const orders = [{
      id: 1,
      cashboxId: 11,
      orderLines: [
        { id: 1, dealer: 'Dealer ABC', article: 'Article ABC', price: 12.00},
        { id: 2, dealer: 'Dealer XYZ', article: 'Article XYZ', price: 18.00}
      ]
    }];
    return { cashboxes, orders };
  }
}
