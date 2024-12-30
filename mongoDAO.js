const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const dbName = 'proj2024MongoDB';
const collName = 'lectures';

var lecturersDB;
var lecturers;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        lecturersDB = client.db(dbName);
        lecturers = lecturersDB.collection(collName);
    })
    .catch((error) => {
        console.log(error);
    });

    //displays all lectures and details
function getLecturers() {
    return lecturers.find().sort({ _id: 1 }).toArray();
}

//delete function
function deleteLecturer(lid) {
    return lecturers.deleteOne({ _id: lid });
}

module.exports = {
    getLecturers,
    deleteLecturer
};
