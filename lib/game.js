const Shoe = require('./shoe');
const Player = require('./player');
const Dealer = require('./dealer');
const Hand = require('./hand');

class Game {
  constructor() {
    this.dealer = new Dealer('Dealer');
    this.player = new Player('Jason');
    this.shoe = new Shoe;
  }

  dealCards() {
    const shoe = this.shoe;

    [this.player, this.dealer].forEach(participant => {
      participant.hands.forEach(hand => {
        hand.receiveCard(shoe);
        hand.receiveCard(shoe);
      });
    });
  }

}

module.exports = Game;
