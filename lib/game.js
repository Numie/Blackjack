import Shoe from './shoe';
import Player from './player';
import Dealer from './dealer';
import Hand from './hand';
import { renderCard, sleep } from './util.js';

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

}
