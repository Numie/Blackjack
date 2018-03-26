export const printMessage = message => {
  document.getElementById('message').innerHTML = `${message}`;
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
