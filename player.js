const Hand = require('./hand');

class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
    this.hand = new Hand;
    this.multiHand = false;
  }

  placeBet(hand, amt) {
    this.bankroll -= amt;
    this.hand.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += amt;
  }

}

module.exports = Player;
