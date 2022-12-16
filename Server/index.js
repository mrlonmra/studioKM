const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { emit } = require("nodemon");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Negaazul1!",
  database: "studiokm",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { nomeCliente } = req.body;
  const { telefoneCliente } = req.body;
  const { emailCliente } = req.body;
  const { nascimentoCliente } = req.body;
  let mysql = "INSERT INTO clientes ( nomeCliente, telefoneCliente, emailCliente, nascimentoCliente) VALUES (?, ?, ?, ?)";
  db.query(mysql, [nomeCliente, telefoneCliente, emailCliente, nascimentoCliente], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { nomeCliente } = req.body;
  const { telefoneCliente } = req.body;
  const { emailCliente } = req.body;
  const { nascimentoCliente } = req.body;
  let mysql = "SELECT * from clientes WHERE nomeCliente = ? AND telefoneCliente = ? AND emailCliente = ? AND nascimentoCliente = ?";
  db.query(mysql, [nomeCliente, telefoneCliente, emailCliente, nascimentoCliente], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * from clientes";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { nomeCliente } = req.body;
  const { telefoneCliente } = req.body;
  const { emailCliente } = req.body;
  const { nascimentoCliente } = req.body;
  let SQL = "UPDATE clientes SET nomeCliente = ?, telefoneCliente = ?, emailCliente = ?, nascimentoCliente = ? WHERE id = ?";
  db.query(SQL, [nomeCliente, telefoneCliente, emailCliente, nascimentoCliente, id], (err, result) => {
    if(err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM clientes WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("SERVIDOR RODANDO NA PORTA: 3001");
});