import Shoe from './shoe';
import {Player} from './player';
import {Dealer} from './player';
import Hand from './hand';
import { renderCard, startRound, renderBankrolls, sleep } from './util.js';

export default class Game {
  constructor() {
    this.dealer = new Dealer('Dealer');
    this.player = new Player('Jason');
    this.shoe = new Shoe;
    this.allHands = [];
  }

  async dealCards() {
    const shoe = this.shoe;

    for (let i = 0; i < 2; i++) {
      this.player.hands.forEach(async (hand) => {
        renderCard(hand.receiveCard(shoe), hand, 'player');
        await sleep(1000);
      });

      await sleep(1000)
      renderCard(this.dealer.hand.receiveCard(shoe), this.dealer.hand, 'dealer');
      await sleep(1000);
    }
  }

  payBets() {
    const self = this;
    const player = this.player;
    const dealer = this.dealer;
    player.hands.forEach(async (hand) => {
      if (hand.value > dealer.hand.value) {
        player.receiveWinnings(hand.bet);
        dealer.bankroll -= hand.bet;
      } else {
        dealer.bankroll += hand.bet;
      }
      hand.bet = null;
      renderBankrolls(self);
      await sleep(1000);
    });

    startRound(self);
  }
}
