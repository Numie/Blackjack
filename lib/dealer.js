// import Player from './player';
// import Hand from './hand';
// import { renderCard, renderHandValue, checkTurnStatus, endTurn } from './util.js';
//
// export default class Dealer extends Player {
//   constructor(name) {
//     super(name);
//     this.hand = new Hand;
//   }
//
//   playTurn(game, shoe) {
//     if (this.hand.value < 17) {
//       this.hit(shoe);
//     } else {
//       this.stay();
//     }
//   }
//
//   hit(shoe) {
//     const hand = this.hand;
//     renderCard(hand.hit(shoe), hand, 'dealer');
//     renderHandValue(this);
//     checkTurnStatus(this);
//   }
//
//   // stay() {
//   //
//   // }
// }
