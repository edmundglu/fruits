const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.static('dist'));
//start in dist folder when you boot up the server

app.get('/fruitList', (req, res) => {
  axios
    .get('https://www.fruityvice.com/api/fruit/all')
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});
