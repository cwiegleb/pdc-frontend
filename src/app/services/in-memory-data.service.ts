export class InMemoryCashboxesService {
  createDb() {
    const cashboxes = [
      { id: 11, name: 'Casbbox 1', validFromDate: new Date(), validToDate: new Date()},
      { id: 12, name: 'Casbbox 2', validFromDate: new Date(), validToDate: new Date()},
    ];

    const orders = [{
      id: 1,
      cashboxId: 11,
      creationDate: new Date(),
      orderLines: [
        { id: 1, dealer: 'Dealer ABC', dealerId: 1, article: 'Article ABC', articleId: 1, price: 12.00},
        { id: 2, dealer: 'Dealer XYZ', dealerId: 2, article: 'Article XYZ', articleId: 2, price: 18.00}
      ]
    },
      {
        id: 2,
        cashboxId: 11,
        creationDate: new Date(),
        orderLines: [
          { id: 1, dealer: 'Dealer ABC', dealerId: 1, article: 'Article ABC', articleId: 1, price: 12.00},
          { id: 2, dealer: 'Dealer XYZ', dealerId: 2, article: 'Article XYZ', articleId: 2, price: 18.00}
        ]
      }];

    const dealers = [
      {id: 1, text: 'Dealer ABC'},
      {id: 2, text: 'Dealer XYZ'}
    ];

    const articles = [
      {id: 1, text: 'Article ABC', dealerId: 1},
      {id: 2, text: 'Article XYZ', dealerId: 2},
    ];

    return { cashboxes, orders, dealers, articles };
  }
}
