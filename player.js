const Hand = require('./hand');

class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
    this.hand = new Hand;
  }

  placeBet(amt) {
    this.bankroll -= amt;
    this.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += amt;
    this.bet = null;
  }
}

module.exports = Player;
