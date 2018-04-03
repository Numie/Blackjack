import Shoe from './shoe';
import {Player} from './player';
import {Dealer} from './player';
import Hand from './hand';
import { renderCard, startRound, renderBankrolls, sleep, asyncForEach } from './util.js';
import { printMessage, flashPayout, flashPushMessage } from './messages.js';
import { cardSound, winSound } from './sounds';
import { displayBasicStrategy } from './basic_strategy';

export default class Game {
  constructor() {
    this.dealer = new Dealer('Dealer');
    this.player = new Player('Player');
    this.shoe = new Shoe;
    this.count = 0;
  }

  async dealCards() {
    const shoe = this.shoe;
    const currentHandIndex = this.player.currentHandIndex;
    const self = this;

    for (let i = 0; i < 2; i++) {
      this.player.hands.forEach(async (hand) => {
        const card = hand.receiveCard(shoe);
        renderCard(card, hand, 'player', null, currentHandIndex);
        self.addToCount(card);
        cardSound.play();
        await sleep(500);
      });

      await sleep(500)
      if (i === 0) {
        const card = this.dealer.hand.receiveCard(shoe);
        renderCard(card, this.dealer.hand, 'dealer-facedown');
        cardSound.play();
      } else {
        const card = this.dealer.hand.receiveCard(shoe);
        renderCard(card, this.dealer.hand, 'dealer-normal');
        self.addToCount(card);
        cardSound.play();
      }
      await sleep(500);
    }
    displayBasicStrategy(self);
  }

  async payBets() {
    const self = this;
    const player = self.player;
    const dealer = self.dealer;

    if (dealer.hand.isBlackjack) {
      this.payBetsWithDealerBlackjack(player, dealer);
    } else {
      this.payBetsNormal(player, dealer);
    }

    const numHands = player.hands.filter(hand => !hand.busted).length;

    await sleep(1000 * numHands)

    if (this.isOver()) {
      if (this.winner() === 'player') {
        printMessage('YOU WIN');
      } else {
        printMessage('DEALER WINS');
      }
    } else {
      startRound(self);
    }
  }

  async payBetsWithDealerBlackjack(player, dealer) {
    const self = this;

    await asyncForEach(player.hands, async (hand, idx) => {
      if (hand.busted) {
        return;
      } else if (hand.isBlackjack) {
        flashPayout('player', hand.bet, '+');
        player.bankroll += hand.bet;
      } else {
        flashPayout('dealer', hand.bet, '+');
        dealer.bankroll += hand.bet;
        document.getElementById(`player-bet-${idx}`).style.color = 'red';
        document.getElementById(`player-hand-value-${idx}`).style.color = 'red';
      }

      hand.bet = null;
      renderBankrolls(self);
      await sleep(1000);
    });
  }

  async payBetsNormal(player, dealer) {
    const self = this;

    await asyncForEach(player.hands, async (hand, idx) => {
      if (hand.busted) {
        return;
      } else if (hand.isBlackjack) {
        flashPayout('player', hand.bet * 2.5, '+');
        flashPayout('dealer', hand.bet * 1.5, '-');
        winSound.play();
        player.bankroll += (hand.bet * 2.5);
        dealer.bankroll -= (hand.bet * 1.5);
        document.getElementById(`player-bet-${idx}`).style.color = 'gold';
        document.getElementById(`player-hand-value-${idx}`).style.color = 'gold';
      } else if (dealer.hand.busted || hand.value > dealer.hand.value) {
        flashPayout('player', hand.bet * 2, '+');
        flashPayout('dealer', hand.bet, '-');
        winSound.play();
        player.receiveWinnings(hand.bet);
        dealer.bankroll -= hand.bet;
        document.getElementById(`player-bet-${idx}`).style.color = 'gold';
        document.getElementById(`player-hand-value-${idx}`).style.color = 'gold';
      } else if (hand.value < dealer.hand.value) {
        flashPayout('dealer', hand.bet, '+');
        dealer.bankroll += hand.bet;
        document.getElementById(`player-bet-${idx}`).style.color = 'red';
        document.getElementById(`player-hand-value-${idx}`).style.color = 'red';
      } else {
        flashPayout('player', hand.bet, '+');
        flashPushMessage();
        player.bankroll += hand.bet;
      }

      hand.bet = null;
      renderBankrolls(self);
      await sleep(1000);
    });
  }

  addToCount(card) {
    if (parseInt(card.value()) < 7) {
      this.count += 1;
    } else if (parseInt(card.value()) > 9) {
      this.count -= 1;
    }
    const count = this.countToString();
    const decks = parseInt(this.shoe.cards.length / 52);
    document.getElementById('count').innerHTML = `${count}`;
    document.getElementById('decks-remaining').innerHTML = `${decks}`;
    document.getElementById('true-count').innerHTML = `${parseInt(count / decks)}`;
  }

  countToString() {
    if (this.count > 0) {
      return `+${this.count}`;
    } else if (this.count < 0) {
      return `${this.count}`;
    } else {
      return '0';
    }
  }

  isOver() {
    return this.player.bankroll <= 0 || this.dealer.bankroll <= 0;
  }

  winner() {
    return this.player.bankroll <= 0 ? 'dealer' : 'player';
  }
}
