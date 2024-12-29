var express = require('express');
var bodyParser = require('body-parser');
const { render } = require('express/lib/response');
var mySQLDAO = require('./mySQLDAO');
//var mongoDAO = require('./mongoDAO');
var app = express();
const port = 3004;


app.listen(3004, () => {
console.log("running on port 3004");
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Home.html");
});

// STUDENTS PAGE
app.get('/students', (req, res) => {
  mySQLDAO.getStudents()
      .then((result) => {
          res.render('showStudents', { students: result });
      })
      .catch((error) => {
          res.send(error);
      });
});

