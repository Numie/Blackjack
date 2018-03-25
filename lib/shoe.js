import Card from './card';

export default class Shoe {
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

    const randomRank = Card.ranks[Math.floor(Math.random() * Card.ranks.length)];
    const randomSuit = Card.suits[Math.floor(Math.random() * Card.suits.length)];

    const card = new Card('2', randomSuit)

    shoe.splice(0, 0, card);
    shoe.splice(2, 0, card);
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
