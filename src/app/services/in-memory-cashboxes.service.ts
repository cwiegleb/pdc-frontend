export class InMemoryCashboxesService {
  createDb() {
    const cashboxes = [
      { id: 11, name: 'Casbbox 1' },
      { id: 12, name: 'Casbbox 2' },
    ];
    return { cashboxes };


  }
}
