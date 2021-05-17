const express = require('express')
const app = express()
const port = 3000
const { v4: uuid4 } = require('uuid')
app.use(express.json())
const axios = require('axios')

const ingressosCliente = {};

//Obtem os dados dos ingressos por parametro do cliente
app.get('/clientes/:id/ingressos', (req, res) => {
    res.status(200).send(ingressosCliente[req.params.id] || [])
});

//Recebe as informações do barramento
app.post('/eventos', (req, res) => {
    try{console.log(req.body);
    }catch(err){}
    res.status(200).send({ msg: "ok"})
})

//Faz o cadastro de um ingresso para um cliente
app.post('/clientes/:id/ingressos',async (req, res) => {
    //Framework uuid4 cria um Id aleatorio para cada requisicao
    const idIng = uuid4();
    const { descricao } = req.body; 
    //Faz uma requisicao do parametro do id e atribui a uma constante 
    const ingressosParametro = ingressosCliente[req.params.id] || [];
    //Envia os dados para a constante ingressosParametros
    ingressosParametro.push({id: idIng, descricao });
    //o id referente ao cliente recebe os dados do ingresso
    ingressosCliente[req.params.id] = ingressosParametro;
    //envia uma informacao assincrona para o barramento 
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ingressoComprado",
        dados: {
            id: idIng, 
            descricao,
            ingressoId: req.params.id, 
        }
    })
    res.status(201).send(ingressosParametro)   
});
app.put('/clientes/:id/ingressos', (req,res) => {

    res.status(200).send(ingressosCliente[ingressoId])
});

app.delete('/clientes/:id/ingressos/:id_ingresso', (req,res) =>{
    const { descricao } = req.body
    var ingressoId = req.params.id
    ingressosCliente.forEach((ingresso,index) => {
        (ingresso.id == ingressoId) ? ingresso.splice(index, 1) : ""
    });
    res.status(200).send(ingressosCliente);
});

app.listen(port, () => console.log("Ingressos, porta 3000"))