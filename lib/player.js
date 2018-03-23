import Hand from './hand';
import Game from './game';
import { renderCard, renderHandValue, checkTurnStatus, endTurn, sleep } from './util';

export class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
    this.hands = [new Hand];
    this.bet = 0;
    this.currentHandIndex = 0;
    this.currentHand = this.hands[this.currentHandIndex];
    this.isBusted = false;
  }

  placeBet(hand, amt) {
    this.bankroll -= amt;
    this.bet = amt;
    hand.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += (amt * 2);
  }

  hit(game, shoe) {
    const hand = this.currentHand;
    renderCard(hand.hit(shoe), hand, 'player');
    renderHandValue(this);
    checkTurnStatus(game, this);
  }

  stay(game) {
    this.nextHand(game);
  }

  doubleDown(game, shoe) {
    this.bankroll -= this.currentHand.bet;
    this.currentHand.doubleDown(shoe);
  }

  split(game) {
    const i = this.currentHandIndex;

    const half1 = this.hands.slice(0, i);
    const half2 = this.hands.slice(i + 1);

    const currentHand = this.currentHand;

    this.hands = half1.concat(currentHand.split()).concat(half2);

    this.currentHand = this.hands[this.currentHandIndex];
  }

  nextHand(game) {
    const idx = this.currentHandIndex;
    if (this.currentHand.busted) {
      this.hands.splice(idx, 1);
    } else {
      this.currentHandIndex += 1;
    }

    this.currentHand = this.hands[this.currentHandIndex];
    if (this.currentHand === undefined) {
      endTurn(game);
    }
  }

  checkIfBusted() {
    if (this.hands.every(hand => hand.busted)) {
      this.isBusted = true;
    }
  }
}

export class Dealer extends Player {
  constructor(name) {
    super(name);
    this.hand = new Hand;
  }

  async playTurn(game, shoe) {
    if (!game.player.isBusted) {
      while (this.hand.value < 17) {
        this.hit(game, shoe);

        if (this.hand.isBusted()) {
          this.hand.busted = true;
        }

        await sleep(1000);
      }
      this.checkIfBusted();
    }
    await sleep(1000);
    game.payBets();
  }

  hit(game, shoe) {
    const hand = this.hand;
    renderCard(hand.hit(shoe), hand, 'dealer');
    renderHandValue(this);
  }

  checkIfBusted() {
    if (this.hand.busted) {
      this.isBusted = true;
    }
  }
}
