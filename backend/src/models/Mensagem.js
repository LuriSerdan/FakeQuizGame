const con = require("../db.js");

const Mensagem = {
    get(limit) {
        return new Promise((res, rej) => { 
            con.query(`SELECT * FROM Mensagem WHERE tipo = 1 ORDER BY RAND() LIMIT ${limit}`, (err, result) => {
                if (err) rej(err);
                res(result);
            });

        });
    }
}

module.exports = Mensagem;