import { sleep } from './util';
import { winnerSound, loseSound } from './sounds';

export const printMessage = message => {
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'none');
  document.getElementById('dealer-hand-value').style.display = 'none';
  document.getElementById('message').innerHTML = `${message}`;
  message === 'YOU WIN' ? winnerSound.play() : loseSound.play();
  document.getElementById('play-again-button').style.display = 'initial';
};

export const flashBustMessage = async () => {
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'none');
  document.getElementById('dealer-hand-value').style.display = 'none';
  document.getElementById('message').innerHTML = 'BUST';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
  document.getElementById('dealer-hand-value').style.display = 'initial';
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'initial');
};

export const flashBlackjackMessage = async () => {
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'none');
  document.getElementById('dealer-hand-value').style.display = 'none';
  document.getElementById('message').innerHTML = 'BLACKJACK!';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
  document.getElementById('dealer-hand-value').style.display = 'initial';
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'initial');
};

export const flashDealerBustMessage = async () => {
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'none');
  document.getElementById('dealer-hand-value').style.display = 'none';
  document.getElementById('message').innerHTML = 'DEALER BUSTS!';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
  document.getElementById('dealer-hand-value').style.display = 'initial';
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'initial');
};

export const flashPushMessage = async () => {
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'none');
  document.getElementById('dealer-hand-value').style.display = 'none';
  document.getElementById('message').innerHTML = 'PUSH';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
  document.getElementById('dealer-hand-value').style.display = 'initial';
  Array.from(document.getElementsByClassName('hand-value')).map(el => el.style.display = 'initial');
};

export const printError = message => {
  const error = document.createElement('div');
  error.id = 'error'
  error.innerHTML = `${message}`;
  document.getElementById('action-buttons').appendChild(error);
};

export const clearError = () => {
  const error = document.getElementById('error');
  if (error) {
    document.getElementById('action-buttons').removeChild(error);
  }
};

export const flashPayout = async (player, amt, sign) => {
  const amount = document.createElement('h3');
  amount.innerHTML = `${sign} ${amt}`;
  document.getElementById(`${player}-info-area`).appendChild(amount);
  await sleep(1000);
  document.getElementById(`${player}-info-area`).removeChild(amount);
};
