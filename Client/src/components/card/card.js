import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        id={props.id}
        nomeCliente={props.nomeCliente}
        telefoneCliente={props.telefoneCliente}
        emailCliente={props.emailCliente}
        nascimentoCliente={props.nascimentoCliente}
        listClientes={props.listClientes}
        setListClientes={props.setListClientes}
        />
      <div className="card--container" onClick={() => setOpen(true)}>
        <h1 className="card--nomeCliente">{props.nomeCliente}</h1>
        <p className="card--telefoneCliente">{props.telefoneCliente}</p>
        <p className="card--emailCliente">{props.emailCliente}</p>
        <p className="card--nascimentoCliente">{props.nascimentoCliente}</p>
      </div>
    </>
  );
}