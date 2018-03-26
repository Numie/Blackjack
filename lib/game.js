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
    const currentHandIndex = this.player.currentHandIndex;

    for (let i = 0; i < 2; i++) {
      this.player.hands.forEach(async (hand) => {
        renderCard(hand.receiveCard(shoe), hand, 'player', null, currentHandIndex);
        await sleep(500);
      });

      await sleep(500)
      if (i === 0) {
        renderCard(this.dealer.hand.receiveCard(shoe), this.dealer.hand, 'dealer-facedown');
      } else {
        renderCard(this.dealer.hand.receiveCard(shoe), this.dealer.hand, 'dealer-normal');
      }
      await sleep(500);
    }
  }

  payBets() {
    debugger
    const self = this;
    const player = self.player;
    const dealer = self.dealer;

    if (dealer.hand.isBlackjack) {
      this.payBetsWithDealerBlackjack(player, dealer);
    } else {
      this.payBetsNormal(player, dealer);
    }

    startRound(self);
  }

  payBetsWithDealerBlackjack(player, dealer) {
    const self = this;

    player.hands.forEach(async (hand) => {
      if (hand.busted) {
        return;
      } else if (hand.isBlackjack) {
        player.bankroll += hand.bet;
      } else {
        dealer.bankroll += hand.bet;
      }

      hand.bet = null;
      renderBankrolls(self);
      await sleep(1000);
    });
  }

  payBetsNormal(player, dealer) {
    const self = this;

    player.hands.forEach(async (hand) => {
      if (hand.busted) {
        return;
      } else if (hand.isBlackjack) {
        player.bankroll += (hand.bet * 2.5);
        dealer.bankroll -= (hand.bet * 1.5);
      } else if (dealer.hand.busted || hand.value > dealer.hand.value) {
        player.receiveWinnings(hand.bet);
        dealer.bankroll -= hand.bet;
      } else if (hand.value < dealer.hand.value) {
        dealer.bankroll += hand.bet;
      } else {
        player.bankroll += hand.bet;
      }

      hand.bet = null;
      renderBankrolls(self);
      await sleep(1000);
    });
  }
}
