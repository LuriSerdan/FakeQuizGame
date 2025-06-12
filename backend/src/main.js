const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const MensagemDAO = require('./models/Mensagem');

app.get('/', (req, res) => {
    res.send({
        mensagem: "Bem Vindo"
    });
});

app.get('/fakes/get', async (req, res) => {
    const limit = req.query.limit || 10
    const mensagens = await MensagemDAO.get(limit);
    res.send(mensagens);
});


app.listen(8080);