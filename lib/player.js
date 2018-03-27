import Hand from './hand';
import Game from './game';
import { createPlayerHand, renderCard, renderHandValue, renderBankrolls, renderBet, checkTurnStatus, renderCardsAfterSplit, renderHandValuesAfterSplit, endTurn, sleep } from './util';
import { flashDealerBustMessage, flashBlackjackMessage } from './messages';
import { cardSound, doubleDownSound } from './sounds';

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
    if (amt > this.bankroll) {
      amt = this.bankroll;
    }

    this.bankroll -= amt;
    this.bet = amt;
    hand.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += (amt * 2);
  }

  hit(game, shoe) {
    const hand = this.currentHand;
    renderCard(hand.hit(shoe), hand, 'player', null, this.currentHandIndex);
    document.getElementById(`player-hand-value-${game.player.currentHandIndex}`).style.left = '10px';
    cardSound.play();
    renderHandValue(this);
    document.getElementById('double-down-button').style.display = 'none';
    document.getElementById('split-button').style.display = 'none';
    checkTurnStatus(game, this);
  }

  stay(game) {
    this.nextHand(game);
  }

  async doubleDown(game, shoe) {
    const hand = this.currentHand;
    hand.isDoubled = true;
    this.bet += this.currentHand.bet;
    this.bankroll -= this.currentHand.bet;
    renderCard(hand.doubleDown(shoe), hand, 'player', 'double', this.currentHandIndex);
    document.getElementById(`player-hand-value-${game.player.currentHandIndex}`).style.left = '0';
    doubleDownSound.play();
    renderBet(game, game.player.currentHandIndex);
    renderBankrolls(game);
    renderHandValue(this);
    await sleep(1000);
    checkTurnStatus(game, this);
  }

  async split(game) {
    this.bet += this.currentHand.bet;
    this.bankroll -= this.currentHand.bet;
    renderBankrolls(game);

    const i = this.currentHandIndex;

    const half1 = this.hands.slice(0, i);
    const half2 = this.hands.slice(i + 1);

    const currentHand = this.currentHand;

    this.hands = half1.concat(currentHand.split()).concat(half2);

    const currentHandIndex = this.currentHandIndex;
    createPlayerHand(currentHandIndex, 'split');

    renderCardsAfterSplit(game, this.hands);
    renderHandValuesAfterSplit(this.hands);

    this.currentHand = this.hands[currentHandIndex];

    const hand = this.currentHand;
    await sleep(500);
    renderCard(hand.receiveCard(game.shoe), hand, 'player', null, currentHandIndex);
    cardSound.play();
    renderHandValue(this);
    if (hand.checkForBlackjack()) {
      hand.isBlackjack = true;
      this.nextHand(game);
    }
  }

  async nextHand(game) {
    const idx = this.currentHandIndex;

    document.getElementById(`player-hand-value-${game.player.currentHandIndex}`).style.border = 'none';

    this.currentHandIndex += 1;

    this.currentHand = this.hands[this.currentHandIndex];
    const currentHand = this.currentHand;

    if (currentHand === undefined) {
      endTurn(game);
    } else if (currentHand.cards.length === 1) {
      await sleep(500);
      renderCard(currentHand.receiveCard(game.shoe), currentHand, 'player', null, this.currentHandIndex);
      cardSound.play();
      renderHandValue(this);
      if (currentHand.checkForBlackjack()) {
        currentHand.isBlackjack = true;
        flashBlackjackMessage();
        await sleep(500);
        this.nextHand(game);
      }
    }

    if (currentHand) {
      document.getElementById('double-down-button').style.display = 'initial';
      document.getElementById('split-button').style.display = 'initial';
      if (currentHand.cards[0].rank !== currentHand.cards[1].rank ||  currentHand.cards.length !== 2) {
        document.getElementById('split-button').style.display = 'none';
      }
    }
  }

  everyHandBlackjack() {
    return this.hands.every(hand => hand.isBlackjack);
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
    document.getElementById('flipped').removeAttribute('id');
    await sleep(400);
    renderHandValue(this);
    await sleep(600);

    if (!game.player.isBusted && !game.player.everyHandBlackjack()) {

      while (this.hand.value < 17) {
        this.hit(game, shoe);

        if (this.hand.isBusted()) {
          this.hand.busted = true;
          flashDealerBustMessage();
        }

        await sleep(1200);
      }
      this.checkIfBusted();
    }

    await sleep(1000);
    game.payBets();
  }

  hit(game, shoe) {
    const hand = this.hand;
    renderCard(hand.hit(shoe), hand, 'dealer');
    cardSound.play();
    renderHandValue(this);
  }

  hasBlackjack() {
    if (this.hand.checkForBlackjack()) {
      this.hand.isBlackjack = true;
      return true;
    }
  }

  checkIfBusted() {
    if (this.hand.busted) {
      this.isBusted = true;
    }
  }
}
