const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    database: "fakeanalyzer",
    user: "root", 
    password: "", 
})

con.connect((err => {
    if (err) throw err;
    console.log("conectado no banco");
}))


module.exports = con;