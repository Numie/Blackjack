class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
    this.aceAs11 = false;
  }

  receiveCard(card) {
    this.cards.push(card);
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
      this.value += card.value;
    }

    if (this.value > 21 && this.aceAs11 === true) {
      this.value -= 10;
    }

  }

  isBusted() {
    this.value > 21;
  }
}

module.exports = Hand;
