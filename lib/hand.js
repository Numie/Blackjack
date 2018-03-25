export default class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
    this.aceAs11 = false;
    this.isHard = false;
    this.bet = null;
    this.busted = false;
    this.isDoubled = false;
    this.isBlackjack = false;
  }

  hit(shoe) {
    return this.receiveCard(shoe);
  }

  doubleDown(shoe) {
    this.bet *= 2;
    return this.receiveCard(shoe);
  }

  split() {
    debugger
    const hand1 = new Hand;
    const hand2 = new Hand;

    const newBet = this.bet / 2.0;

    const card1 = this.cards[0];
    const card2 = this.cards[1];

    hand1.cards.push(card1);
    hand1.addCardToValue(card1);
    hand1.bet = newBet;

    hand2.cards.push(card2);
    hand2.addCardToValue(card2);
    hand2.bet = newBet;

    return [hand1, hand2];
  }

  receiveCard(shoe) {
    const card = shoe.drawCard();
    this.cards.push(card);
    this.addCardToValue(card);
    return card;
  }

  addCardToValue(card) {
    debugger
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

  checkForBlackjack() {
    return (this.value === 21 && this.cards.length === 2);
  }

  isBusted() {
    return this.value > 21;
  }
}
