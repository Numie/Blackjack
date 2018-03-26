/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_shoe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/shoe */ \"./lib/shoe.js\");\n/* harmony import */ var _lib_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/card */ \"./lib/card.js\");\n/* harmony import */ var _lib_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/player */ \"./lib/player.js\");\n/* harmony import */ var _lib_dealer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dealer */ \"./lib/dealer.js\");\n/* harmony import */ var _lib_dealer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_dealer__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_hand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/hand */ \"./lib/hand.js\");\n/* harmony import */ var _lib_game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/game */ \"./lib/game.js\");\n/* harmony import */ var _lib_util_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/util.js */ \"./lib/util.js\");\n\n\n\n\n\n\n\n\nwindow.addEventListener('load', () => {\n  const game = new _lib_game__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n  game.shoe.shuffle();\n  Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"renderBankrolls\"])(game);\n\n  Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"startRound\"])(game);\n\n  document.getElementById('hit-button').addEventListener('click', () => {\n    game.player.hit(game, game.shoe);\n  });\n\n  document.getElementById('stay-button').addEventListener('click', () => {\n    game.player.stay(game);\n  });\n\n  document.getElementById('double-down-button').addEventListener('click', () => {\n    game.player.doubleDown(game, game.shoe);\n  });\n\n  document.getElementById('split-button').addEventListener('click', () => {\n    game.player.split(game);\n  });\n\n  document.getElementById('bet25').addEventListener('click', () => {\n    game.player.placeBet(game.player.currentHand, 25);\n    Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"startHand\"])(game);\n  });\n\n  document.getElementById('bet100').addEventListener('click', () => {\n    game.player.placeBet(game.player.currentHand, 100);\n    Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"startHand\"])(game);\n  });\n\n  document.getElementById('bet500').addEventListener('click', () => {\n    game.player.placeBet(game.player.currentHand, 500);\n    Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"startHand\"])(game);\n  });\n\n  document.getElementById('betAllIn').addEventListener('click', () => {\n    game.player.placeBet(game.player.currentHand, game.player.bankroll);\n    Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_6__[\"startHand\"])(game);\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/card.js":
/*!*********************!*\
  !*** ./lib/card.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\nconst SUITS = {\n  'h': 'h',\n  'd': 'd',\n  's': 's',\n  'c': 'c'\n};\n\nconst RANKS = {\n  '2': '2',\n  '3': '3',\n  '4': '4',\n  '5': '5',\n  '6': '6',\n  '7': '7',\n  '8': '8',\n  '9': '9',\n  '10': '10',\n  'J': '10',\n  'Q': '10',\n  'K': '10',\n  'A': '11'\n};\n\nclass Card {\n  constructor(rank, suit) {\n    this.rank = rank;\n    this.suit = suit;\n  }\n\n  value() {\n    return parseInt(RANKS[this.rank]);\n  }\n\n  static suits() {\n    return Object.keys(SUITS);\n  }\n\n  static ranks() {\n    return Object.keys(RANKS);\n  }\n\n  static values() {\n    return Object.values(RANKS);\n  }\n}\n\n//# sourceURL=webpack:///./lib/card.js?");

/***/ }),

/***/ "./lib/dealer.js":
/*!***********************!*\
  !*** ./lib/dealer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import Player from './player';\n// import Hand from './hand';\n// import { renderCard, renderHandValue, checkTurnStatus, endTurn } from './util.js';\n//\n// export default class Dealer extends Player {\n//   constructor(name) {\n//     super(name);\n//     this.hand = new Hand;\n//   }\n//\n//   playTurn(game, shoe) {\n//     if (this.hand.value < 17) {\n//       this.hit(shoe);\n//     } else {\n//       this.stay();\n//     }\n//   }\n//\n//   hit(shoe) {\n//     const hand = this.hand;\n//     renderCard(hand.hit(shoe), hand, 'dealer');\n//     renderHandValue(this);\n//     checkTurnStatus(this);\n//   }\n//\n//   // stay() {\n//   //\n//   // }\n// }\n\n//# sourceURL=webpack:///./lib/dealer.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _shoe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shoe */ \"./lib/shoe.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hand */ \"./lib/hand.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\n\n\n\n\n\nclass Game {\n  constructor() {\n    this.dealer = new _player__WEBPACK_IMPORTED_MODULE_1__[\"Dealer\"]('Dealer');\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"Player\"]('Jason');\n    this.shoe = new _shoe__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.allHands = [];\n  }\n\n  async dealCards() {\n    const shoe = this.shoe;\n    const currentHandIndex = this.player.currentHandIndex;\n\n    for (let i = 0; i < 2; i++) {\n      this.player.hands.forEach(async hand => {\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"renderCard\"])(hand.receiveCard(shoe), hand, 'player', null, currentHandIndex);\n        await Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"sleep\"])(500);\n      });\n\n      await Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"sleep\"])(500);\n      if (i === 0) {\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"renderCard\"])(this.dealer.hand.receiveCard(shoe), this.dealer.hand, 'dealer-facedown');\n      } else {\n        Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"renderCard\"])(this.dealer.hand.receiveCard(shoe), this.dealer.hand, 'dealer-normal');\n      }\n      await Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"sleep\"])(500);\n    }\n  }\n\n  payBets() {\n    const self = this;\n    const player = self.player;\n    const dealer = self.dealer;\n\n    if (dealer.hand.isBlackjack) {\n      this.payBetsWithDealerBlackjack(player, dealer);\n    } else {\n      this.payBetsNormal(player, dealer);\n    }\n\n    Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"startRound\"])(self);\n  }\n\n  payBetsWithDealerBlackjack(player, dealer) {\n    const self = this;\n\n    player.hands.forEach(async hand => {\n      if (hand.busted) {\n        return;\n      } else if (hand.isBlackjack) {\n        player.bankroll += hand.bet;\n      } else {\n        dealer.bankroll += hand.bet;\n      }\n\n      hand.bet = null;\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"renderBankrolls\"])(self);\n      await Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"sleep\"])(1000);\n    });\n  }\n\n  payBetsNormal(player, dealer) {\n    const self = this;\n\n    player.hands.forEach(async hand => {\n      if (hand.busted) {\n        return;\n      } else if (hand.isBlackjack) {\n        player.bankroll += hand.bet * 2.5;\n        dealer.bankroll -= hand.bet * 1.5;\n      } else if (dealer.hand.busted || hand.value > dealer.hand.value) {\n        player.receiveWinnings(hand.bet);\n        dealer.bankroll -= hand.bet;\n      } else if (hand.value < dealer.hand.value) {\n        dealer.bankroll += hand.bet;\n      } else {\n        player.bankroll += hand.bet;\n      }\n\n      hand.bet = null;\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"renderBankrolls\"])(self);\n      await Object(_util_js__WEBPACK_IMPORTED_MODULE_3__[\"sleep\"])(1000);\n    });\n  }\n}\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/hand.js":
/*!*********************!*\
  !*** ./lib/hand.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Hand; });\nclass Hand {\n  constructor() {\n    this.cards = [];\n    this.value = 0;\n    this.aceAs11 = false;\n    this.isHard = false;\n    this.bet = null;\n    this.busted = false;\n    this.isDoubled = false;\n    this.isBlackjack = false;\n  }\n\n  hit(shoe) {\n    return this.receiveCard(shoe);\n  }\n\n  doubleDown(shoe) {\n    this.bet *= 2;\n    return this.receiveCard(shoe);\n  }\n\n  split() {\n    const hand1 = new Hand();\n    const hand2 = new Hand();\n\n    const card1 = this.cards[0];\n    const card2 = this.cards[1];\n\n    hand1.cards.push(card1);\n    hand1.addCardToValue(card1);\n    hand1.bet = this.bet;\n\n    hand2.cards.push(card2);\n    hand2.addCardToValue(card2);\n    hand2.bet = this.bet;\n\n    return [hand1, hand2];\n  }\n\n  receiveCard(shoe) {\n    const card = shoe.drawCard();\n    this.cards.push(card);\n    this.addCardToValue(card);\n    return card;\n  }\n\n  addCardToValue(card) {\n    if (card.rank === 'A') {\n\n      if (this.value >= 11) {\n        this.value += 1;\n      } else {\n        this.aceAs11 = true;\n        this.value += 11;\n      }\n    } else {\n      this.value += card.value();\n    }\n\n    if (this.value > 21 && this.aceAs11 === true && this.isHard === false) {\n      this.isHard = true;\n      this.value -= 10;\n    }\n  }\n\n  checkForBlackjack() {\n    return this.value === 21 && this.cards.length === 2;\n  }\n\n  isBusted() {\n    return this.value > 21;\n  }\n}\n\n//# sourceURL=webpack:///./lib/hand.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: Player, Dealer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dealer\", function() { return Dealer; });\n/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hand */ \"./lib/hand.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\n\n\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.bankroll = 1000;\n    this.hands = [new _hand__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()];\n    this.bet = 0;\n    this.currentHandIndex = 0;\n    this.currentHand = this.hands[this.currentHandIndex];\n    this.isBusted = false;\n  }\n\n  placeBet(hand, amt) {\n    this.bankroll -= amt;\n    this.bet = amt;\n    hand.bet = amt;\n  }\n\n  receiveWinnings(amt) {\n    this.bankroll += amt * 2;\n  }\n\n  hit(game, shoe) {\n    const hand = this.currentHand;\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCard\"])(hand.hit(shoe), hand, 'player', null, this.currentHandIndex);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n    document.getElementById('double-down-button').style.display = 'none';\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"checkTurnStatus\"])(game, this);\n  }\n\n  stay(game) {\n    this.nextHand(game);\n  }\n\n  doubleDown(game, shoe) {\n    this.bet += this.currentHand.bet;\n    this.bankroll -= this.currentHand.bet;\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderBet\"])(game, game.player.currentHandIndex);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderBankrolls\"])(game);\n\n    const hand = this.currentHand;\n    hand.isDoubled = true;\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCard\"])(hand.doubleDown(shoe), hand, 'player', 'double', this.currentHandIndex);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"checkTurnStatus\"])(game, this);\n  }\n\n  async split(game) {\n    this.bet += this.currentHand.bet;\n    this.bankroll -= this.currentHand.bet;\n\n    const i = this.currentHandIndex;\n\n    const half1 = this.hands.slice(0, i);\n    const half2 = this.hands.slice(i + 1);\n\n    const currentHand = this.currentHand;\n\n    this.hands = half1.concat(currentHand.split()).concat(half2);\n\n    const currentHandIndex = this.currentHandIndex;\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"createPlayerHand\"])(currentHandIndex, 'split');\n\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCardsAfterSplit\"])(game, this.hands);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValuesAfterSplit\"])(this.hands);\n\n    this.currentHand = this.hands[currentHandIndex];\n\n    const hand = this.currentHand;\n    await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(500);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCard\"])(hand.receiveCard(game.shoe), hand, 'player', null, currentHandIndex);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n    if (hand.checkForBlackjack()) {\n      hand.isBlackjack = true;\n    }\n  }\n\n  async nextHand(game) {\n    const idx = this.currentHandIndex;\n    if (this.currentHand.busted) {\n      this.hands.splice(idx, 1);\n    } else {\n      this.currentHandIndex += 1;\n    }\n\n    this.currentHand = this.hands[this.currentHandIndex];\n    const currentHand = this.currentHand;\n\n    if (currentHand === undefined) {\n      Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"endTurn\"])(game);\n    } else if (currentHand.cards.length === 1) {\n      await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(500);\n      Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCard\"])(currentHand.receiveCard(game.shoe), currentHand, 'player', null, this.currentHandIndex);\n      Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n      if (currentHand.checkForBlackjack()) {\n        currentHand.isBlackjack = true;\n      }\n    }\n  }\n\n  everyHandBlackjack() {\n    return this.hands.every(hand => hand.isBlackjack);\n  }\n\n  checkIfBusted() {\n    if (this.hands.every(hand => hand.busted)) {\n      this.isBusted = true;\n    }\n  }\n}\n\nclass Dealer extends Player {\n  constructor(name) {\n    super(name);\n    this.hand = new _hand__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  async playTurn(game, shoe) {\n    document.getElementById('flipped').removeAttribute('id');\n    await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(400);\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n    await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(600);\n\n    if (!game.player.isBusted && !game.player.everyHandBlackjack()) {\n\n      while (this.hand.value < 17) {\n        this.hit(game, shoe);\n\n        if (this.hand.isBusted()) {\n          this.hand.busted = true;\n        }\n\n        await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(1200);\n      }\n      this.checkIfBusted();\n    }\n\n    await Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"sleep\"])(1000);\n    game.payBets();\n  }\n\n  hit(game, shoe) {\n    const hand = this.hand;\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderCard\"])(hand.hit(shoe), hand, 'dealer');\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"renderHandValue\"])(this);\n  }\n\n  hasBlackjack() {\n    if (this.hand.checkForBlackjack()) {\n      this.hand.isBlackjack = true;\n      return true;\n    }\n  }\n\n  checkIfBusted() {\n    if (this.hand.busted) {\n      this.isBusted = true;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./lib/shoe.js":
/*!*********************!*\
  !*** ./lib/shoe.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Shoe; });\n/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ \"./lib/card.js\");\n\n\nclass Shoe {\n  constructor(cards = Shoe.createShoe()) {\n    this.cards = cards;\n  }\n\n  static createShoe() {\n    let shoe = [];\n\n    _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ranks().forEach(rank => {\n      _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].suits().forEach(suit => {\n        shoe.push(new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"](rank, suit));\n      });\n    });\n\n    for (let i = 0; i < 3; i++) {\n      shoe = shoe.concat(shoe);\n    }\n\n    return shoe;\n  }\n\n  shuffle() {\n    for (let i = this.cards.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];\n    }\n\n    const randomRank = _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ranks()[Math.floor(Math.random() * _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ranks().length)];\n    const randomSuit = _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].suits()[Math.floor(Math.random() * _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"].suits().length)];\n\n    const card = new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"](randomRank, randomSuit);\n\n    for (let i = 0; i < 21; i++) {\n      if (i % 2 !== 0) {\n        continue;\n      } else {\n        let nextCard = Object.assign(new _card__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), card);\n        this.cards.splice(i, 0, nextCard);\n      }\n    }\n\n    return this.cards;\n  }\n\n  count() {\n    return this.cards.length;\n  }\n\n  drawCard() {\n    return this.cards.shift();\n  }\n\n}\n\n//# sourceURL=webpack:///./lib/shoe.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: sleep, createPlayerHand, renderCard, renderCardsAfterSplit, renderBankrolls, startRound, startHand, createBet, renderBet, renderHandValue, renderHandValuesAfterSplit, checkTurnStatus, endTurn, clearPlayerCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sleep\", function() { return sleep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPlayerHand\", function() { return createPlayerHand; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderCard\", function() { return renderCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderCardsAfterSplit\", function() { return renderCardsAfterSplit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderBankrolls\", function() { return renderBankrolls; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startRound\", function() { return startRound; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startHand\", function() { return startHand; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createBet\", function() { return createBet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderBet\", function() { return renderBet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderHandValue\", function() { return renderHandValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderHandValuesAfterSplit\", function() { return renderHandValuesAfterSplit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkTurnStatus\", function() { return checkTurnStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"endTurn\", function() { return endTurn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearPlayerCards\", function() { return clearPlayerCards; });\n/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hand */ \"./lib/hand.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\n\n\n\n\nconst sleep = ms => {\n  return new Promise(resolve => setTimeout(resolve, ms));\n};\n\nconst createPlayerHand = (currentHandIndex, split) => {\n  const hand = document.createElement('div');\n\n  hand.id = `player-card-container-${currentHandIndex}`;\n  hand.className = 'player-card-container';\n  document.getElementById('player-card-area').appendChild(hand);\n\n  if (split) {\n    const cardContainers = Array.from(document.getElementsByClassName('player-card-container')).reverse();\n    cardContainers.forEach((container, idx) => {\n      container.id = `player-card-container-${idx}`;\n    });\n  }\n};\n\nconst renderCard = (card, hand, type, double, currentHandIndex) => {\n  if (type === 'player') {\n    const container = document.getElementById(`player-card-container-${currentHandIndex}`);\n    if (double) {\n      container.appendChild(createPlayerCard(card, hand, double));\n    } else {\n      container.appendChild(createPlayerCard(card, hand));\n    }\n  } else {\n    document.getElementById('dealer-card-container').appendChild(createDealerCard(card, hand, type));\n  }\n};\n\nconst renderCardsAfterSplit = (game, hands) => {\n  clearPlayerCards();\n  hands.forEach((hand, idx) => {\n    hand.cards.forEach(card => renderCard(card, hand, 'player', null, idx));\n    createBet(idx);\n    renderBet(game, idx);\n  });\n};\n\nconst createPlayerCard = (card, hand, double) => {\n  const newCard = document.createElement('div');\n  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'player-card red-card' : newCard.className = 'player-card black-card';\n\n  if (double) {\n    newCard.style.transform = 'rotate(90deg)';\n    newCard.style.bottom = '80px';\n    newCard.style.left = '-120px';\n  } else {\n    const cardNumber = hand.cards.indexOf(card);\n    newCard.style.bottom = `${15 * cardNumber}px`;\n    newCard.style.left = `${-70 * cardNumber}px`;\n  }\n\n  const cardRankTop = document.createElement('div');\n  cardRankTop.className = 'card-rank card-rank-top';\n  cardRankTop.innerHTML = card.rank;\n\n  const cardSuit = document.createElement('div');\n  cardSuit.className = 'card-suit';\n  if (card.suit === 'h') {\n    cardSuit.innerHTML = `&hearts;`;\n  } else if (card.suit === 'd') {\n    cardSuit.innerHTML = `&diams;`;\n  } else if (card.suit === 's') {\n    cardSuit.innerHTML = `&spades;`;\n  } else {\n    cardSuit.innerHTML = `&clubs;`;\n  }\n\n  const cardRankBottom = document.createElement('div');\n  cardRankBottom.className = 'card-rank card-rank-bottom';\n  cardRankBottom.innerHTML = card.rank;\n\n  newCard.appendChild(cardRankTop);\n  newCard.appendChild(cardSuit);\n  newCard.appendChild(cardRankBottom);\n\n  return newCard;\n};\n\nconst createDealerCard = (card, hand, type) => {\n  const flippedCardContainer = document.createElement('div');\n  flippedCardContainer.className = 'flipped-card-container';\n\n  const newCard = document.createElement('div');\n  newCard.className = 'card';\n  if (type === 'dealer-facedown') {\n    newCard.id = 'flipped';\n  }\n\n  const cardFront = document.createElement('figure');\n  card.suit === 'h' || card.suit === 'd' ? cardFront.className = 'front red-card' : cardFront.className = 'front black-card';\n\n  const cardRankTop = document.createElement('div');\n  cardRankTop.className = 'card-rank card-rank-top';\n  cardRankTop.innerHTML = card.rank;\n\n  const cardSuit = document.createElement('div');\n  cardSuit.className = 'card-suit';\n  if (card.suit === 'h') {\n    cardSuit.innerHTML = `&hearts;`;\n  } else if (card.suit === 'd') {\n    cardSuit.innerHTML = `&diams;`;\n  } else if (card.suit === 's') {\n    cardSuit.innerHTML = `&spades;`;\n  } else {\n    cardSuit.innerHTML = `&clubs;`;\n  }\n\n  const cardRankBottom = document.createElement('div');\n  cardRankBottom.className = 'card-rank card-rank-bottom';\n  cardRankBottom.innerHTML = card.rank;\n\n  const cardBack = document.createElement('figure');\n  cardBack.className = 'back';\n\n  cardFront.appendChild(cardRankTop);\n  cardFront.appendChild(cardSuit);\n  cardFront.appendChild(cardRankBottom);\n\n  newCard.appendChild(cardFront);\n  newCard.appendChild(cardBack);\n\n  flippedCardContainer.appendChild(newCard);\n\n  return flippedCardContainer;\n};\n\nconst renderBankrolls = game => {\n  document.getElementById('player-bankroll').innerHTML = `Bankroll: $${game.player.bankroll}`;\n  document.getElementById('dealer-bankroll').innerHTML = `Bankroll: $${game.dealer.bankroll}`;\n};\n\nconst startRound = game => {\n  resetRound(game);\n  createPlayerHand(game.player.currentHandIndex);\n  createBet(game.player.currentHandIndex);\n  requestBet(game);\n};\n\nconst requestBet = game => {\n  document.getElementById('bet-buttons').style.display = 'initial';\n};\n\nconst startHand = async game => {\n  renderBet(game, game.player.currentHandIndex);\n  renderBankrolls(game);\n  game.dealCards();\n\n  document.getElementById('bet-buttons').style.display = 'none';\n  await sleep(2000);\n  renderHandValue(game.player);\n\n  if (game.dealer.hasBlackjack()) {\n    game.dealer.playTurn(game, game.shoe);\n  } else {\n    document.getElementById('action-buttons').style.display = 'initial';\n\n    game.player.hands.forEach(hand => {\n      if (hand.checkForBlackjack()) {\n        hand.isBlackjack = true;\n      }\n    });\n\n    if (game.player.currentHand.isBlackjack) {\n      game.player.nextHand(game);\n    }\n  }\n};\n\nconst createBet = handIndex => {\n  const playerBet = document.createElement('div');\n  playerBet.className = 'player-bet';\n  playerBet.id = `player-bet-${handIndex}`;\n  // playerBet.innerHTML = `Bet: $${game.player.bet}`;\n  document.getElementById(`player-card-container-${handIndex}`).appendChild(playerBet);\n};\n\nconst renderBet = (game, handIndex) => {\n  // const playerBet = document.createElement('div');\n  // playerBet.className = 'player-bet';\n  // playerBet.innerHTML = `Bet: $${game.player.bet}`;\n  // document.getElementById(`player-card-container-${game.player.currentHandIndex}`).appendChild(playerBet);\n  document.getElementById(`player-bet-${handIndex}`).innerHTML = `Bet: $${game.player.hands[handIndex].bet}`;\n};\n\nconst renderHandValue = player => {\n  if (player instanceof _player__WEBPACK_IMPORTED_MODULE_1__[\"Dealer\"]) {\n    document.getElementById('dealer-hand-value').innerHTML = player.hand.value;\n  } else {\n    let playerHandValue = document.getElementById(`player-hand-value-${player.currentHandIndex}`);\n    if (!playerHandValue) {\n      playerHandValue = document.createElement('div');\n      playerHandValue.className = 'player-hand-value';\n      playerHandValue.id = `player-hand-value-${player.currentHandIndex}`;\n    }\n    playerHandValue.innerHTML = player.currentHand.value;\n    document.getElementById(`player-card-container-${player.currentHandIndex}`).appendChild(playerHandValue);\n  }\n};\n\nconst renderHandValuesAfterSplit = hands => {\n  const handContainers = Array.from(document.getElementsByClassName('player-card-container')).reverse();\n\n  handContainers.forEach((hand, idx) => {\n    let playerHandValue = document.createElement('div');\n    playerHandValue.className = 'player-hand-value';\n    playerHandValue.id = `player-hand-value-${idx}`;\n    playerHandValue.innerHTML = hands[idx].value;\n    hand.appendChild(playerHandValue);\n  });\n};\n\nconst checkTurnStatus = (game, player) => {\n  const hand = game.player.currentHand;\n  if (hand.isBusted()) {\n    hand.busted = true;\n    game.dealer.bankroll += hand.bet;\n    renderBankrolls(game);\n    player.checkIfBusted();\n    player.nextHand(game);\n  } else if (hand.isDoubled) {\n    player.nextHand(game);\n  }\n};\n\nconst endTurn = game => {\n  document.getElementById('action-buttons').style.display = 'none';\n  game.dealer.playTurn(game, game.shoe);\n};\n\nconst resetRound = game => {\n  game.player.hands = [new _hand__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()];\n  game.player.bet = 0;\n  game.player.currentHandIndex = 0;\n  game.player.currentHand = game.player.hands[game.player.currentHandIndex];\n  game.player.isBusted = false;\n\n  game.dealer.hand = new _hand__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  document.getElementById('double-down-button').style.display = 'initial';\n\n  Array.from(document.getElementsByClassName('card-container')).forEach(cardContainer => {\n    while (cardContainer.firstChild) {\n      cardContainer.removeChild(cardContainer.firstChild);\n    }\n  });\n\n  const playerCardArea = document.getElementById('player-card-area');\n  while (playerCardArea.firstChild) {\n    playerCardArea.removeChild(playerCardArea.firstChild);\n  }\n\n  document.getElementById('dealer-hand-value').innerHTML = null;\n};\n\nconst clearPlayerCards = () => {\n  Array.from(document.getElementsByClassName('player-card-container')).forEach(cardContainer => {\n    while (cardContainer.firstChild) {\n      cardContainer.removeChild(cardContainer.firstChild);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });