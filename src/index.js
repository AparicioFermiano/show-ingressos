const express = require('express')
const app = express()
const port = 3000
const { v4: uuid4 } = require('uuid')
app.use(express.json())
// const axios = requide('axios')

const ingressoCliente = {}

app.get('/clientes/:id/ingressos', (req, res) => {
    res.status(200).send(ingressoCliente[req.params.id] || [])
});

app.put('/clientes/:id/ingressos', (req, res) => {
    const idIng = uuid4();
    const { descricao, quantidade } = req.body;  
    const ingressosParametro = ingressoCliente[req.params.id] || [];
    ingressosParametro.push({id: idIng, descricao, quantidade});
    ingressoCliente[req.params.id] = ingressosParametro;

    res.status(201).send(ingressosParametro)   
});


app.listen(port, () => console.log("Ingressos, porta 3000"))