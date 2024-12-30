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

//UPDATE STUDENT PAGE
app.get('/students/edit/:sid', (req, res) => {
    mySQLDAO.getStudentById(req.params.sid)
        .then((student) => {
            res.render('updateStudent', { student });
        })
        .catch((error) => {
            res.send(error);
        });
});

app.post('/students/edit/:sid', (req, res) => {
    const { sid, name, age } = req.body;
    mySQLDAO.updateStudent(sid, name, age)
        .then(() => {
            res.redirect('/students');
        })
        .catch((error) => {
            res.render('updateStudent', { error: error.message, student: req.body });
        });
});

