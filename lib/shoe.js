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

    return shoe;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    // const randomRank = Card.ranks()[Math.floor(Math.random() * Card.ranks().length)];
    // const randomSuit = Card.suits()[Math.floor(Math.random() * Card.suits().length)];
    //
    // const card = new Card(randomRank, randomSuit)
    //
    // for (let i = 0; i < 4; i ++) {
    //   if (i % 2 !== 0) {
    //     continue;
    //   } else {
    //     let nextCard = Object.assign(new Card, card);
    //     this.cards.splice(i, 0, nextCard);
    //   }
    // }

    // const aceCard = new Card('A', 's');
    // const kingCard = new Card('K', 's');
    // // this.cards.splice(0, 0, aceCard);
    // this.cards.splice(4, 0, kingCard);
    // this.cards.splice(5, 0, kingCard);

    return this.cards;
  }

  count() {
    return this.cards.length;
  }

  drawCard() {
    return this.cards.shift();
  }

}
