import Hand from './hand';
import { renderCard, renderPlayerHandValue } from './util.js';

export default class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
    this.hands = [new Hand];
    this.bet = 0;
    this.currentHandIndex = 0;
    this.currentHand = this.hands[this.currentHandIndex];
  }

  placeBet(hand, amt) {
    this.bankroll -= amt;
    this.bet = amt;
    hand.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += amt;
  }

  hit(shoe) {
    const hand = this.currentHand;
    renderCard(hand.hit(shoe), hand, 'player');
    renderPlayerHandValue(this);
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
