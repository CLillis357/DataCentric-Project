var mysql = require('promise-mysql');

var pool;

mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql'
})
    .then((result) => {
        pool = result;
    })
    .catch((error) => {
        console.log(error);
});

function getStudents() {
    return pool.query('SELECT * FROM student ORDER BY sid');
}

function getStudentById(sid) {
    return pool.query('SELECT * FROM student WHERE sid = ?', [sid]).then((result) => result[0]);
}

function updateStudent(sid, name, age) {
    return pool.query('UPDATE student SET name = ?, age = ? WHERE sid = ?', [name, age, sid]);
}

module.exports = {
    getStudents,
    getStudentById,
    updateStudent
};