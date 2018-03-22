const Hand = require('./hand');

class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
    this.hands = [new Hand];
    this.currentHandIndex = 0;
    this.currentHand = this.hands[this.currentHandIndex];
  }

  placeBet(hand, amt) {
    this.bankroll -= amt;
    hand.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += amt;
  }

  hit(shoe) {
    debugger
    this.currentHand.hit(shoe);
  }

  stay() {
    this.currentHandIndex += 1;
    this.currentHand = this.hands[this.currentHandIndex];
  }

  doubleDown(shoe) {
    this.bankroll -= this.currentHand.bet;
    this.currentHand.doubleDown(shoe);
  }

  split() {
    const i = this.currentHandIndex;

    const half1 = this.hands.slice(0, i);
    const half2 = this.hands.slice(i + 1);

    const currentHand = this.currentHand;

    this.hands = half1.concat(currentHand.split()).concat(half2);

    this.currentHand = this.hands[this.currentHandIndex];
  }

}

module.exports = Player;
