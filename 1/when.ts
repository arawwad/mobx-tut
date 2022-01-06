import { observable, action, when, makeObservable, autorun, toJS } from 'mobx';

type Item = {
  name: string;
  quantitiy: number;
};

class Inventory {
  items: Item[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
    })
    autorun(() => {
      console.log(toJS(this.items))
    })
  }

  async trackAvailability(name: string) {
    await when(
      () => {
        const trackedItem = this.items.find((item) => item.name === name);
        return trackedItem ? trackedItem.quantitiy > 0 : false;
      }
    );
    console.log(`${name} is now available`);
  }

  addItem(name: string, quantitiy: number) {
    const addedItem = this.items.find(item => item.name === name);
    if (addedItem) {
      addedItem.quantitiy += quantitiy
    } else {
      this.items.push({name, quantitiy})
    }
  }

}


const inventory = new Inventory();

inventory.addItem('Shoes', 0);
inventory.trackAvailability('Shoes');

inventory.addItem('Shoes', 1);
