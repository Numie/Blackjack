const Card = require ('./card');

class Shoe {
  constructor(cards = Shoe.createShoe()) {
    this.cards = cards;
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
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    return this.cards;
  }

  count() {
    return this.cards.length;
  }

  drawCard() {
    return this.cards.shift();
  }

}

module.exports = Shoe;
