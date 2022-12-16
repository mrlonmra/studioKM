import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/card/card";

export default 
function App() {
  const [values, setValues] = useState();
    const [listClientes, setListClientes] = useState([]);
  console.log(listClientes);

  const handleRegisterClientes = () => {
    Axios.post("http://localhost:3001/register", {
    nomeCliente: values.nomeCliente,
    telefoneCliente: values.telefoneCliente,
    emailCliente: values.emailCliente,
    nascimentoCliente: values.nascimentoCliente,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        nomeCliente: values.nomeCliente,
        telefoneCliente: values.telefoneCliente,
        emailCliente: values.emailCliente,
        nascimentoCliente: values.nascimentoCliente,
      }).then((response) => {
        setListClientes([
          ...listClientes,
          {
            id: response.data[0].id,
            nomeCliente: values.nomeCliente,
            telefoneCliente: values.telefoneCliente,
            emailCliente: values.emailCliente,
            nascimentoCliente: values.nascimentoCliente,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListClientes(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">Cadastrar Clientes</h1>

        <input
          type="text"
          name="nomeCliente"
          placeholder="Nome"
          className="register--input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="telefoneCliente"
          className="register--input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="emailCliente"
          className="register--input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="nascimentoCliente"
          className="register--input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterClientes} className="register--button">
          Cadastrar
        </button>
      </div>

      {listClientes.map((val) => (
        <Card
          listClientes={listClientes}
          setListClientes={setListClientes}
          key={val.id}
          id={val.id}
          nomeCliente={val.nomeCliente}
          telefoneCliente={val.telefoneCliente}
          emailCliente={val.emailCliente}
          nascimentoCliente={val.nascimentoCliente}
        />
      ))}
    </div>
  );
}