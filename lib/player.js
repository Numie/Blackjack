import Hand from './hand';
import Game from './game';
import { createPlayerHand, renderCard, renderHandValue, renderBankrolls, renderBet, checkTurnStatus, renderCardsAfterSplit, renderHandValuesAfterSplit, endTurn, sleep } from './util';
import { flashDealerBustMessage, flashBlackjackMessage } from './messages';
import { cardSound, doubleDownSound, swooshSound } from './sounds';
import { displayBasicStrategy } from './basic_strategy';

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
    this.bet += amt;
    hand.bet += amt;
  }

  clearBet() {
    this.bankroll += this.bet;
    this.bet = 0;
    this.currentHand.bet = 0;

    document.getElementById('player-bet').remove();
    document.getElementById('bet-button-title').style.display = 'block';
  }

  receiveWinnings(amt) {
    this.bankroll += (amt * 2);
  }

  hit(game, shoe) {
    const hand = this.currentHand;
    const card = hand.hit(shoe);
    renderCard(card, hand, 'player', null, this.currentHandIndex);
    game.addToCount(card);
    displayBasicStrategy(game);
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
    const card = hand.doubleDown(shoe);
    renderCard(card, hand, 'player', 'double', this.currentHandIndex);
    game.addToCount(card);
    displayBasicStrategy(game);
    document.getElementById(`player-hand-value-${game.player.currentHandIndex}`).style.left = '0';
    doubleDownSound.play();
    renderBet(game, game.player.currentHandIndex);
    renderBankrolls(game);
    renderHandValue(this);
    document.getElementById('action-buttons').style.display = 'none';
    await sleep(1000);
    checkTurnStatus(game, this);
  }

  async split(game) {
    document.getElementById('split-button').style.display = 'none';
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
    const card = hand.receiveCard(game.shoe);
    renderCard(card, hand, 'player', null, currentHandIndex);
    if (this.currentHand.cards[0].rank === this.currentHand.cards[1].rank &&  this.currentHand.cards.length === 2) {
      document.getElementById('split-button').style.display = 'initial';
    }
    game.addToCount(card);
    displayBasicStrategy(game);
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
      const card = currentHand.receiveCard(game.shoe);
      renderCard(card, currentHand, 'player', null, this.currentHandIndex);
      game.addToCount(card);
      displayBasicStrategy(game);
      cardSound.play();
      renderHandValue(this);
      if (currentHand.checkForBlackjack()) {
        currentHand.isBlackjack = true;
        flashBlackjackMessage();
        await sleep(500);
        this.nextHand(game);
      }
      document.getElementById('action-buttons').style.display = 'initial';
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
    const card = game.dealer.hand.cards[0];
    game.addToCount(card);
    swooshSound.play();
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
    const card = hand.hit(shoe);
    renderCard(card, hand, 'dealer');
    game.addToCount(card);
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
