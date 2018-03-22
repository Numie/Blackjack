import Player from './player';
import Hand from './hand';

export default class Dealer extends Player {
  constructor(name) {
    super(name);
    this.hand = new Hand;
  }


}
