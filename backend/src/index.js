const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// request.query pega dados da query da url, Ex: /users?name='Maxmiller'
// request.params pega dados dos parametros /users/1
// request.body pega dados do corpo enviado{"name":"Maxmiller"}

app.listen(3333);
