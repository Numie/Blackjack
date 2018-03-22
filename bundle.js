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

/***/ "./card.js":
/*!*****************!*\
  !*** ./card.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const SUITS = {\n  'h': 'h',\n  'd': 'd',\n  's': 's',\n  'c': 'c'\n};\n\nconst RANKS = {\n  '2': '2',\n  '3': '3',\n  '4': '4',\n  '5': '5',\n  '6': '6',\n  '7': '7',\n  '8': '8',\n  '9': '9',\n  '10': '10',\n  'J': '10',\n  'Q': '10',\n  'K': '10',\n  'A': '11'\n};\n\nclass Card {\n  constructor(rank, suit) {\n    this.rank = rank;\n    this.suit = suit;\n  }\n\n  value() {\n    return parseInt(RANKS[this.rank]);\n  }\n\n  static suits() {\n    return Object.keys(SUITS);\n  }\n\n  static ranks() {\n    return Object.keys(RANKS);\n  }\n\n  static values() {\n    return Object.values(RANKS);\n  }\n}\n\nmodule.exports = Card;\n\n//# sourceURL=webpack:///./card.js?");

/***/ }),

/***/ "./dealer.js":
/*!*******************!*\
  !*** ./dealer.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./player.js\");\n\nclass Dealer extends Player {\n  constructor(name) {\n    super(name);\n  }\n\n}\n\nmodule.exports = Dealer;\n\n//# sourceURL=webpack:///./dealer.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shoe = __webpack_require__(/*! ./shoe */ \"./shoe.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./player.js\");\nconst Dealer = __webpack_require__(/*! ./dealer */ \"./dealer.js\");\nconst Hand = __webpack_require__(/*! ./hand */ \"./hand.js\");\n\nclass Game {\n  constructor() {\n    this.dealer = new Dealer('Dealer');\n    this.player = new Player('Jason');\n    this.shoe = new Shoe();\n  }\n\n  dealCards() {\n    const shoe = this.shoe;\n\n    [this.player, this.dealer].forEach(participant => {\n      participant.hands.forEach(hand => {\n        hand.receiveCard(shoe);\n        hand.receiveCard(shoe);\n      });\n    });\n  }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./hand.js":
/*!*****************!*\
  !*** ./hand.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Hand {\n  constructor() {\n    this.cards = [];\n    this.value = 0;\n    this.aceAs11 = false;\n    this.isHard = false;\n    this.bet = null;\n  }\n\n  hit(shoe) {\n    this.receiveCard(shoe);\n  }\n\n  doubleDown(shoe) {\n    this.receiveCard(shoe);\n    this.bet *= 2;\n  }\n\n  split() {\n    const hand1 = new Hand();\n    const hand2 = new Hand();\n\n    const newBet = this.bet / 2.0;\n\n    const card1 = this.cards[0];\n    const card2 = this.cards[1];\n\n    hand1.cards.push(card1);\n    hand1.addCardToValue(card1);\n    hand1.bet = newBet;\n\n    hand2.cards.push(card2);\n    hand2.addCardToValue(card2);\n    hand2.bet = newBet;\n\n    return [hand1, hand2];\n  }\n\n  receiveCard(shoe) {\n    const card = shoe.drawCard();\n    this.cards.push(card);\n    this.addCardToValue(card);\n  }\n\n  addCardToValue(card) {\n    if (card.rank === 'A') {\n\n      if (this.value >= 11) {\n        this.value += 1;\n      } else {\n        this.aceAs11 = true;\n        this.value += 11;\n      }\n    } else {\n      this.value += card.value();\n    }\n\n    if (this.value > 21 && this.aceAs11 === true && this.isHard === false) {\n      this.isHard = true;\n      this.value -= 10;\n    }\n  }\n\n  isBusted() {\n    return this.value > 21;\n  }\n}\n\nmodule.exports = Hand;\n\n//# sourceURL=webpack:///./hand.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shoe = __webpack_require__(/*! ./shoe */ \"./shoe.js\");\nconst Card = __webpack_require__(/*! ./card */ \"./card.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./player.js\");\nconst Dealer = __webpack_require__(/*! ./dealer */ \"./dealer.js\");\nconst Hand = __webpack_require__(/*! ./hand */ \"./hand.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\nwindow.addEventListener('load', () => {\n  const game = new Game();\n  game.shoe.shuffle();\n  game.dealCards();\n\n  console.log(game);\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./player.js":
/*!*******************!*\
  !*** ./player.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Hand = __webpack_require__(/*! ./hand */ \"./hand.js\");\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.bankroll = 1000;\n    this.hands = [new Hand()];\n    this.currentHandIndex = 0;\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n  placeBet(hand, amt) {\n    this.bankroll -= amt;\n    hand.bet = amt;\n  }\n\n  receiveWinnings(amt) {\n    this.bankroll += amt;\n  }\n\n  hit(shoe) {\n    debugger;\n    this.currentHand.hit(shoe);\n  }\n\n  stay() {\n    this.currentHandIndex += 1;\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n  doubleDown(shoe) {\n    this.bankroll -= this.currentHand.bet;\n    this.currentHand.doubleDown(shoe);\n  }\n\n  split() {\n    const i = this.currentHandIndex;\n\n    const half1 = this.hands.slice(0, i);\n    const half2 = this.hands.slice(i + 1);\n\n    const currentHand = this.currentHand;\n\n    this.hands = half1.concat(currentHand.split()).concat(half2);\n\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./player.js?");

/***/ }),

/***/ "./shoe.js":
/*!*****************!*\
  !*** ./shoe.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Card = __webpack_require__(/*! ./card */ \"./card.js\");\n\nclass Shoe {\n  constructor(cards = Shoe.createShoe()) {\n    this.cards = cards;\n  }\n\n  static createShoe() {\n    let shoe = [];\n\n    Card.ranks().forEach(rank => {\n      Card.suits().forEach(suit => {\n        shoe.push(new Card(rank, suit));\n      });\n    });\n\n    for (let i = 0; i < 3; i++) {\n      shoe = shoe.concat(shoe);\n    }\n\n    return shoe;\n  }\n\n  shuffle() {\n    for (let i = this.cards.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];\n    }\n\n    return this.cards;\n  }\n\n  count() {\n    return this.cards.length;\n  }\n\n  drawCard() {\n    return this.cards.shift();\n  }\n\n}\n\nmodule.exports = Shoe;\n\n//# sourceURL=webpack:///./shoe.js?");

/***/ })

/******/ });