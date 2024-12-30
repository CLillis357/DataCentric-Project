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



//ADD STUDENT PAGE
app.get('/students/add', (req, res) => {
    res.render('addStudent', { errors: [], sid: '', name: '', age: '' });
});


app.post('/students/add', (req, res) => {
    const { sid, name, age } = req.body;

    // Initialize an array to store error messages
    const errors = [];

    // Validate Student ID (4 digits)
    const idCount = /^\d{4}$/;
    if (!idCount.test(sid)) {
        errors.push('Student ID should be 4 digits.');
    }

    // Validate Name (letters only, minimum 2 characters)
    const nameLetters = /^[A-Za-z\s]{2,}$/;
    if (!nameLetters.test(name)) {
        errors.push('Student Name should be at least 2 characters and contain letters only.');
    }

    // Validate Age (18 or older)
    if (isNaN(age) || age < 18) {
        errors.push('Student Age should be at least 18.');
    }

    // If there are validation errors, render the form with error messages
    if (errors.length > 0) {
        return res.render('addStudent', {
            errors,
            sid,
            name,
            age
        });
    }

    // Check if the student ID already exists
    mySQLDAO.getStudentById(sid)
        .then((existingStudent) => {
            if (existingStudent) {
                errors.push(`Student with ID ${sid} already exists.`);
                return res.render('addStudent', {
                    errors,
                    sid,
                    name,
                    age
                });
            } else {
                // if stdent doesnt exist continues with adding
                return mySQLDAO.addStudent(sid, name, age)
                    .then(() => {
                        res.redirect('/students');
                    });
            }
        })
        .catch((error) => {
            // Error handling
            res.send(error.message);
        });
});


