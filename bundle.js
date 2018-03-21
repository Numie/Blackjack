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

eval("const SUITS = {\n  'h': 'h',\n  'd': 'd',\n  's': 's',\n  'c': 'c'\n};\n\nconst RANKS = {\n  '2': '2',\n  '3': '3',\n  '4': '4',\n  '5': '5',\n  '6': '6',\n  '7': '7',\n  '8': '8',\n  '9': '9',\n  '10': '10',\n  'J': '10',\n  'Q': '10',\n  'K': '10',\n  'A': '1'\n};\n\nclass Card {\n  constructor(rank, suit) {\n    this.rank = rank;\n    this.suit = suit;\n  }\n\n  value() {\n    return parseInt(this.value);\n  }\n\n  static suits() {\n    return Object.keys(SUITS);\n  }\n\n  static ranks() {\n    return Object.keys(RANKS);\n  }\n\n  static values() {\n    return Object.values(RANKS);\n  }\n}\n\nmodule.exports = Card;\n\n//# sourceURL=webpack:///./card.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shoe = __webpack_require__(/*! ./shoe */ \"./shoe.js\");\nconst Card = __webpack_require__(/*! ./card */ \"./card.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./player.js\");\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./player.js":
/*!*******************!*\
  !*** ./player.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n  constructor(name) {\n    this.name = name;\n    this.bankroll = 1000;\n  }\n\n  placeBet(amt) {\n    this.bankroll -= amt;\n    this.bet = amt;\n  }\n\n  receiveWinnings(amt) {\n    this.bankroll += amt;\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./player.js?");

/***/ }),

/***/ "./shoe.js":
/*!*****************!*\
  !*** ./shoe.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Card = __webpack_require__(/*! ./card */ \"./card.js\");\n\nclass Shoe {\n  constructor(shoe = Shoe.createShoe()) {\n    this.shoe = shoe;\n  }\n\n  static createShoe() {\n    let shoe = [];\n\n    Card.ranks().forEach(rank => {\n      Card.suits().forEach(suit => {\n        shoe.push(new Card(rank, suit));\n      });\n    });\n\n    for (let i = 0; i < 3; i++) {\n      shoe = shoe.concat(shoe);\n    }\n\n    return shoe;\n  }\n\n  shuffle() {\n    for (let i = this.shoe.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];\n    }\n\n    return this.shoe;\n  }\n\n  count() {\n    return this.shoe.length;\n  }\n\n  take(n = 1) {\n    const cards = [];\n    for (let i = 0; i < n; i++) {\n      cards.push(this.shoe.shift());\n    }\n    return cards;\n  }\n\n}\nconst shoe = new Shoe();\nconsole.log();\n\nmodule.exports = Shoe;\n\n//# sourceURL=webpack:///./shoe.js?");

/***/ })

/******/ });