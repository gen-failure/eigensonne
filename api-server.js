const express = require('express');
const path = require('path');

const app = express();
const axios = require('axios').create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// An api endpoint that returns a short list of items
app.get('/api/item/:itemId', async (req,res) => {
  let r = await axios.get(`item/${req.params.itemId}`);
  res.send(r.data);
});

app.get('/api/:whatever', async (req,res) => {
  let r = await axios.get(req.params.whatever);
  res.send(r.data);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
