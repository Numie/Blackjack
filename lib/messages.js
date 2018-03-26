import { sleep } from './util';

export const printMessage = message => {
  document.getElementById('message').style.color = 'white';
  document.getElementById('message').innerHTML = `${message}`;
};

export const flashBustMessage = async () => {
  document.getElementById('message').style.color = 'red';
  document.getElementById('message').innerHTML = 'BUST';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
};

export const flashBlackjackMessage = async () => {
  document.getElementById('message').style.color = 'white';
  document.getElementById('message').innerHTML = 'BLACKJACK!';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
};

export const flashDealerBustMessage = async () => {
  document.getElementById('message').style.color = 'white';
  document.getElementById('message').innerHTML = 'DEALER BUSTS!';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
};

export const flashPushMessage = async () => {
  document.getElementById('message').style.color = 'white';
  document.getElementById('message').innerHTML = 'PUSH';
  await sleep(1000);
  document.getElementById('message').innerHTML = '';
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
