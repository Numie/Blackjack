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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shoe = __webpack_require__(/*! ./lib/shoe */ \"./lib/shoe.js\");\nconst Card = __webpack_require__(/*! ./lib/card */ \"./lib/card.js\");\nconst Player = __webpack_require__(/*! ./lib/player */ \"./lib/player.js\");\nconst Dealer = __webpack_require__(/*! ./lib/dealer */ \"./lib/dealer.js\");\nconst Hand = __webpack_require__(/*! ./lib/hand */ \"./lib/hand.js\");\nconst Game = __webpack_require__(/*! ./lib/game */ \"./lib/game.js\");\n\nwindow.addEventListener('load', () => {\n  const game = new Game();\n  game.shoe.shuffle();\n  game.dealCards();\n\n  document.getElementById('hitButton').addEventListener('click', () => {\n    const card = game.player.hit(game.shoe);\n    renderCard(card, game.player);\n  });\n\n  document.getElementById('stayButton').addEventListener('click', () => {\n    game.player.stay();\n  });\n\n  document.getElementById('doubleDownButton').addEventListener('click', () => {\n    game.player.doubleDown(game.shoe);\n  });\n\n  document.getElementById('splitButton').addEventListener('click', () => {\n    game.player.split();\n  });\n});\n\nrenderCard = (card, player) => {\n  const playerCardArea = document.getElementById('player-card-container');\n  playerCardArea.appendChild(createCard(card));\n};\n\ncreateCard = card => {\n  const newCard = document.createElement('div');\n  card.suit === 'h' || card.suit === 'd' ? newCard.className = 'card red-card' : newCard.className = 'card';\n\n  const cardRankTop = document.createElement('div');\n  cardRankTop.className = 'card-rank card-rank-top';\n  cardRankTop.innerHTML = card.rank;\n\n  const cardSuit = document.createElement('div');\n  cardSuit.className = 'card-suit';\n  if (card.suit === 'h') {\n    cardSuit.innerHTML = `&hearts;`;\n  } else if (card.suit === 'd') {\n    cardSuit.innerHTML = `&diams;`;\n  } else if (card.suit === 's') {\n    cardSuit.innerHTML = `&spades;`;\n  } else {\n    cardSuit.innerHTML = `&clubs;`;\n  }\n\n  const cardRankBottom = document.createElement('div');\n  cardRankBottom.className = 'card-rank card-rank-bottom';\n  cardRankBottom.innerHTML = card.rank;\n\n  newCard.appendChild(cardRankTop);\n  newCard.appendChild(cardSuit);\n  newCard.appendChild(cardRankBottom);\n\n  return newCard;\n};\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/card.js":
/*!*********************!*\
  !*** ./lib/card.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const SUITS = {\n  'h': 'h',\n  'd': 'd',\n  's': 's',\n  'c': 'c'\n};\n\nconst RANKS = {\n  '2': '2',\n  '3': '3',\n  '4': '4',\n  '5': '5',\n  '6': '6',\n  '7': '7',\n  '8': '8',\n  '9': '9',\n  '10': '10',\n  'J': '10',\n  'Q': '10',\n  'K': '10',\n  'A': '11'\n};\n\nclass Card {\n  constructor(rank, suit) {\n    this.rank = rank;\n    this.suit = suit;\n  }\n\n  value() {\n    return parseInt(RANKS[this.rank]);\n  }\n\n  static suits() {\n    return Object.keys(SUITS);\n  }\n\n  static ranks() {\n    return Object.keys(RANKS);\n  }\n\n  static values() {\n    return Object.values(RANKS);\n  }\n}\n\nmodule.exports = Card;\n\n//# sourceURL=webpack:///./lib/card.js?");

/***/ }),

/***/ "./lib/dealer.js":
/*!***********************!*\
  !*** ./lib/dealer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n\nclass Dealer extends Player {\n  constructor(name) {\n    super(name);\n  }\n\n}\n\nmodule.exports = Dealer;\n\n//# sourceURL=webpack:///./lib/dealer.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shoe = __webpack_require__(/*! ./shoe */ \"./lib/shoe.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./lib/player.js\");\nconst Dealer = __webpack_require__(/*! ./dealer */ \"./lib/dealer.js\");\nconst Hand = __webpack_require__(/*! ./hand */ \"./lib/hand.js\");\n\nclass Game {\n  constructor() {\n    this.dealer = new Dealer('Dealer');\n    this.player = new Player('Jason');\n    this.shoe = new Shoe();\n  }\n\n  dealCards() {\n    const shoe = this.shoe;\n\n    [this.player, this.dealer].forEach(participant => {\n      participant.hands.forEach(hand => {\n        hand.receiveCard(shoe);\n        hand.receiveCard(shoe);\n      });\n    });\n  }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/hand.js":
/*!*********************!*\
  !*** ./lib/hand.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Hand {\n  constructor() {\n    this.cards = [];\n    this.value = 0;\n    this.aceAs11 = false;\n    this.isHard = false;\n    this.bet = null;\n  }\n\n  hit(shoe) {\n    return this.receiveCard(shoe);\n  }\n\n  doubleDown(shoe) {\n    this.receiveCard(shoe);\n    this.bet *= 2;\n  }\n\n  split() {\n    const hand1 = new Hand();\n    const hand2 = new Hand();\n\n    const newBet = this.bet / 2.0;\n\n    const card1 = this.cards[0];\n    const card2 = this.cards[1];\n\n    hand1.cards.push(card1);\n    hand1.addCardToValue(card1);\n    hand1.bet = newBet;\n\n    hand2.cards.push(card2);\n    hand2.addCardToValue(card2);\n    hand2.bet = newBet;\n\n    return [hand1, hand2];\n  }\n\n  receiveCard(shoe) {\n    const card = shoe.drawCard();\n    this.cards.push(card);\n    this.addCardToValue(card);\n    return card;\n  }\n\n  addCardToValue(card) {\n    if (card.rank === 'A') {\n\n      if (this.value >= 11) {\n        this.value += 1;\n      } else {\n        this.aceAs11 = true;\n        this.value += 11;\n      }\n    } else {\n      this.value += card.value();\n    }\n\n    if (this.value > 21 && this.aceAs11 === true && this.isHard === false) {\n      this.isHard = true;\n      this.value -= 10;\n    }\n  }\n\n  isBusted() {\n    return this.value > 21;\n  }\n}\n\nmodule.exports = Hand;\n\n//# sourceURL=webpack:///./lib/hand.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Hand = __webpack_require__(/*! ./hand */ \"./lib/hand.js\");\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.bankroll = 1000;\n    this.hands = [new Hand()];\n    this.currentHandIndex = 0;\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n  placeBet(hand, amt) {\n    this.bankroll -= amt;\n    hand.bet = amt;\n  }\n\n  receiveWinnings(amt) {\n    this.bankroll += amt;\n  }\n\n  hit(shoe) {\n    return this.currentHand.hit(shoe);\n  }\n\n  stay() {\n    this.currentHandIndex += 1;\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n  doubleDown(shoe) {\n    this.bankroll -= this.currentHand.bet;\n    this.currentHand.doubleDown(shoe);\n  }\n\n  split() {\n    const i = this.currentHandIndex;\n\n    const half1 = this.hands.slice(0, i);\n    const half2 = this.hands.slice(i + 1);\n\n    const currentHand = this.currentHand;\n\n    this.hands = half1.concat(currentHand.split()).concat(half2);\n\n    this.currentHand = this.hands[this.currentHandIndex];\n  }\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./lib/shoe.js":
/*!*********************!*\
  !*** ./lib/shoe.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Card = __webpack_require__(/*! ./card */ \"./lib/card.js\");\n\nclass Shoe {\n  constructor(cards = Shoe.createShoe()) {\n    this.cards = cards;\n  }\n\n  static createShoe() {\n    let shoe = [];\n\n    Card.ranks().forEach(rank => {\n      Card.suits().forEach(suit => {\n        shoe.push(new Card(rank, suit));\n      });\n    });\n\n    for (let i = 0; i < 3; i++) {\n      shoe = shoe.concat(shoe);\n    }\n\n    return shoe;\n  }\n\n  shuffle() {\n    for (let i = this.cards.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];\n    }\n\n    return this.cards;\n  }\n\n  count() {\n    return this.cards.length;\n  }\n\n  drawCard() {\n    return this.cards.shift();\n  }\n\n}\n\nmodule.exports = Shoe;\n\n//# sourceURL=webpack:///./lib/shoe.js?");

/***/ })

/******/ });