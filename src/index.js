const express = require('express')
const app = express()
const port = 3000
const axios = requide('axios')

app.get('/clientes', (req, res) => {
    res.send('Hello World!')



    res.status(200).send(clientes)
});

app.put('/clientes', (req, res) => {
    
    
    
    res.status(200).send(clientes)    
});


app.listen(port, () => console.log("Ingressos, porta 3000"))