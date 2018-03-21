const Card = require ('./card');

class Shoe {
  constructor(shoe = Shoe.createShoe()) {
    this.shoe = shoe;
  };

  static createShoe() {
    let shoe = [];

    Card.ranks().forEach(rank => {
      Card.suits().forEach(suit => {
        shoe.push(new Card(rank, suit))
      });
    });

    for (let i = 0; i < 3; i++) {
      shoe = shoe.concat(shoe);
    }

    return shoe;
  }

  shuffle() {
    for (let i = this.shoe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
    }

    return this.shoe;
  }

  count() {
    return this.shoe.length;
  }

  take(n=1) {
    const cards = [];
    for (let i = 0; i < n; i++) {
      cards.push(this.shoe.shift());
    }
    return cards;
  }

}
const shoe = new Shoe;
console.log();

module.exports = Shoe;
