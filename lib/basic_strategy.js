import Card from './card';
import Hand from './hand';

export const displayBasicStrategy = game => {
  const basicStrategyContainer = document.getElementById('basic-strategy');
  const basicStrategyText = document.getElementById('basic-strategy-text');
  if (
    game.dealer.hand.cards.length === 2 &&
    game.player.currentHand &&
    !game.player.currentHand.busted &&
    !game.player.currentHand.isDoubled &&
    !game.player.currentHand.isBlackjack &&
    !game.dealer.hand.isBlackjack
  ) {
    basicStrategyText.innerHTML = 'Basic Strategy:'
    basicStrategyContainer.innerHTML = `${basicStrategy(game)}`;
  } else {
    basicStrategyText.innerHTML = 'Waiting For Your Turn...'
    basicStrategyContainer.innerHTML = '';
  }
};

const basicStrategy = game => {
  const hand = game.player.currentHand;
  const dealerUpCard = game.dealer.hand.cards[1].value();

  if (isSplittable(hand)) {
    if (hand.value === 4 || hand.value === 6) {
      return (dealerUpCard <= 7 ? 'Split' : 'Hit');
    } else if (hand.value === 8) {
      return (dealerUpCard === 5 || dealerUpCard === 6 ? 'Split' : 'Hit');
    } else if (hand.value === 10) {
      return (dealerUpCard < 10 ? 'Double' : 'Hit');
    } else if (hand.value === 12 && !hand.aceAs11) {
      return (dealerUpCard <= 6 ? 'Split' : 'Hit');
    } else if (hand.value === 14) {
      return (dealerUpCard <= 7 ? 'Split' : 'Hit');
    } else if (hand.value === 16 || hand.value === 12) {
      return 'Split';
    } else if (hand.value === 18) {
      return (dealerUpCard <= 7 || dealerUpCard === 9 ? 'Split' : 'Stand');
    } else {
      return 'Stand';
    }
  } else if (isDoubleable(hand)) {
    if (hand.value < 9) {
      return 'Hit';
    } else if (hand.value === 9) {
      return (dealerUpCard <= 6 && dealerUpCard >= 3 ? 'Double' : 'Hit');
    } else if (hand.value === 10) {
      return (dealerUpCard <= 9 ? 'Double' : 'Hit');
    } else if (hand.value === 11) {
      return (dealerUpCard <= 10 ? 'Double' : 'Hit');
    } else if (hand.aceAs11 && (hand.value === 13 || hand.value === 14)) {
      return (dealerUpCard === 5 || dealerUpCard === 6 ? 'Double' : 'Hit');
    } else if (hand.aceAs11 && (hand.value === 15 || hand.value === 16)) {
      return (dealerUpCard <= 6 && dealerUpCard >= 4 ? 'Double' : 'Hit');
    } else if (hand.aceAs11 && hand.value === 17) {
      return (dealerUpCard <= 6 && dealerUpCard >= 3 ? 'Double' : 'Hit');
    } else if (hand.aceAs11 && hand.value === 18) {
      if (dealerUpCard <= 6 && dealerUpCard >= 3) {
        return 'Double';
      } else if (dealerUpCard === 2 || dealerUpCard === 7 || dealerUpCard === 8) {
        return 'Stand';
      } else {
        return 'Hit';
      }
    } else if (hand.value === 12) {
      return (dealerUpCard <= 3 || dealerUpCard >= 7 ? 'Hit' : 'Stand');
    } else if (hand.value <= 16) {
      return (dealerUpCard <= 6 ? 'Stand' : 'Hit');
    } else {
      return 'Stand';
    }
  } else {
    if (hand.value <= 11) {
      return 'Hit';
    } else if (hand.value <= 17 && hand.aceAs11 && !hand.isHard) {
      return 'Hit';
    } else if (hand.value === 18 && hand.aceAs11 && !hand.isHard) {
      if (dealerUpCard <= 8) {
        return 'Stand';
      } else {
        return 'Hit';
      }
    } else if (hand.value === 12) {
      return (dealerUpCard <= 3 || dealerUpCard >= 7 ? 'Hit' : 'Stand');
    } else if (hand.value <= 16) {
      return (dealerUpCard <= 6 ? 'Stand' : 'Hit');
    } else {
      return 'Stand';
    }
  }
};

const isSplittable = hand => {
  return (hand.cards.length === 2 && hand.cards[0].rank === hand.cards[1].rank);
};

const isDoubleable = hand => {
  return hand.cards.length === 2;
};
