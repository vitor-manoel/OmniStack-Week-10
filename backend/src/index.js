const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const http = require('http');
const routes = require('./routes.js')
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://vitormanoel:330603@cluster0-crrfh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json());
app.use(routes);

//Métodos HTTP -> get, post, put, delete

//Tipos de Parâmetros :
//-Query params : request.query (Filtros, ordenação, paginação, ....)
//-Route params : request.params (Identificar recurso na alteração ou remoção)
//-Body : request.body (Dados para criação ou alteração de registro)


//MongoDB (Não-Relacional)

server.listen(3333);