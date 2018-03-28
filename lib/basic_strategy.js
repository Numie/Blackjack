import Card from './card';
import Hand from './hand';

export const displayBasicStrategy = game => {
  const basicStrategyContainer = document.getElementById('basic-strategy');
  if (
    game.dealer.hand.cards.length === 2 &&
    game.player.currentHand &&
    !game.player.currentHand.busted &&
    !game.player.currentHand.isDoubled &&
    !game.player.currentHand.isBlackjack &&
    !game.dealer.hand.isBlackjack
  ) {
    basicStrategyContainer.innerHTML = `${basicStrategy(game)}`;
  } else {
    basicStrategyContainer.innerHTML = '';
  }
};

const basicStrategy = game => {
  const hand = game.player.currentHand;
  const dealerUpCard = game.dealer.hand.cards[1].value();

  if (isSplittable(hand)) {
    if (hand.value === 4 || hand.value === 6) {
      return (dealerUpCard <= 7 ? 'split' : 'hit');
    } else if (hand.value === 8) {
      return (dealerUpCard === 5 || dealerUpCard === 6 ? 'split' : 'hit');
    } else if (hand.value === 10) {
      return (dealerUpCard < 10 ? 'double' : 'hit');
    } else if (hand.value === 12 && !hand.aceAs11) {
      return (dealerUpCard <= 6 ? 'split' : 'hit');
    } else if (hand.value === 14) {
      return (dealerUpCard <= 7 ? 'split' : 'hit');
    } else if (hand.value === 16 || hand.value === 12) {
      return 'split';
    } else if (hand.value === 18) {
      return (dealerUpCard <= 7 || dealerUpCard === 9 ? 'split' : 'stay');
    } else {
      return 'stay';
    }
  } else if (isDoubleable(hand)) {
    if (hand.value < 9) {
      return 'hit';
    } else if (hand.value === 9) {
      return (dealerUpCard <= 6 && dealerUpCard >= 3 ? 'double' : 'hit');
    } else if (hand.value === 10) {
      return (dealerUpCard <= 9 ? 'double' : 'hit');
    } else if (hand.value === 11) {
      return (dealerUpCard <= 10 ? 'double' : 'hit');
    } else if (hand.aceAs11 && (hand.value === 13 || hand.value === 14)) {
      return (dealerUpCard === 5 || dealerUpCard === 6 ? 'double' : 'hit');
    } else if (hand.aceAs11 && (hand.value === 15 || hand.value === 16)) {
      return (dealerUpCard <= 6 && dealerUpCard >= 4 ? 'double' : 'hit');
    } else if (hand.aceAs11 && hand.value === 17) {
      return (dealerUpCard <= 6 && dealerUpCard >= 3 ? 'double' : 'hit');
    } else if (hand.aceAs11 && hand.value === 18) {
      if (dealerUpCard <= 6 && dealerUpCard >= 3) {
        return 'double';
      } else if (dealerUpCard === 2 || dealerUpCard === 7 || dealerUpCard === 8) {
        return 'stay';
      } else {
        return 'hit';
      }
    } else if (hand.value === 12) {
      return (dealerUpCard <= 3 || dealerUpCard >= 7 ? 'hit' : 'stay');
    } else if (hand.value <= 16) {
      return (dealerUpCard <= 6 ? 'stay' : 'hit');
    } else {
      return 'stay';
    }
  } else {
    if (hand.value <= 11) {
      return 'hit';
    } else if (hand.value === 12) {
      return (dealerUpCard <= 3 || dealerUpCard >= 7 ? 'hit' : 'stay');
    } else if (hand.value <= 16) {
      return (dealerUpCard <= 6 ? 'stay' : 'hit');
    } else {
      return 'stay';
    }
  }
};

const isSplittable = hand => {
  return (hand.cards.length === 2 && hand.cards[0].rank === hand.cards[1].rank);
};

const isDoubleable = hand => {
  return hand.cards.length === 2;
};
