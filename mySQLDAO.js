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

function addStudent(sid, name, age) {
    return pool.query('INSERT INTO student (sid, name, age) VALUES (?, ?, ?)', [sid, name, age]);
}

function deleteStudent(sid) {
    return pool.query('DELETE FROM student WHERE sid = ?', [sid]);
}

function getGrades() {
    return pool.query(`
        SELECT s.name AS studentName, 
               m.name AS moduleName, 
               g.grade
        FROM student s
        LEFT JOIN grade g ON s.sid = g.sid
        LEFT JOIN module m ON g.mid = m.mid
        ORDER BY s.name, g.grade`
    );
}



module.exports = {
    getStudents,
    getStudentById,
    updateStudent,
    addStudent,
    deleteStudent,
    getGrades
};