const express = require('express');
const database = require('./database')
const cors  = require('cors')
const routes = require('./routes');

//configuração 
const app = express();
app.use(cors());

//middleware
app.use(express.json());

//escolhendo a versão da rota
app.use('/v1', routes)

//setando porta e ligando servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {console.log(`(/◕ヮ◕)/ Server Running on http://localhost:${PORT}`)});