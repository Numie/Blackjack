class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
    this.aceAs11 = false;
    this.isHard = false;
    this.bet = null;
  }

  hit(shoe) {
    this.receiveCard();
  }

  doubleDown(shoe) {
    this.receiveCard();
    this.bet *= 2;
  }

  split() {
    const hand1 = new Hand;
    const hand2 = new Hand;

    hand1.cards.push(this.hand.cards[0]);
    hand2.cards.push(this.hand.cards[1]);

    this.hands.push(hand1);
    this.hands.push(hand2);

    this.multiHand = true;
  }

  receiveCard(shoe) {
    const card = shoe.drawCard();
    this.cards.push(card);
    this.addCardToValue(card);
  }

  addCardToValue(card) {
    if (card.rank === 'A') {

      if (this.value >= 11) {
        this.value += 1;
      } else {
        this.aceAs11 = true;
        this.value += 11;
      }

    } else {
      this.value += card.value();
    }

    if (this.value > 21 && (this.aceAs11 === true && this.isHard === false)) {
      this.isHard = true
      this.value -= 10;
    }

  }

  isBusted() {
    return this.value > 21;
  }
}

module.exports = Hand;
