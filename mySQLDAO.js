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

module.exports = {
    getStudents
};