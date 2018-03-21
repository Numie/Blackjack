class Player {
  constructor(name) {
    this.name = name;
    this.bankroll = 1000;
  }

  placeBet(amt) {
    this.bankroll -= amt;
    this.bet = amt;
  }

  receiveWinnings(amt) {
    this.bankroll += amt;
  }
}

module.exports = Player;
