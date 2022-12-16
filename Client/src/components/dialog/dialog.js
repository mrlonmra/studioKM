import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nomeCliente: props.nomeCliente,
    telefoneCliente: props.telefoneCliente,
    emailCliente: props.emailCliente,
    nascimentoCliente: props.nascimentoCliente,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditClient = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      nomeCliente: editValues.nomeCliente,
      telefoneCliente: editValues.telefoneCliente,
      emailCliente: editValues.emailCliente,
      nascimentoCliente: editValues.nascimentoCliente,
    }).then(() => {
      props.setListClientes(
        props.listClientes.map((value) => {
          return value.id === editValues.id
            ? {
              id: editValues.id,
              nomeCliente: editValues.nomeCliente,
              telefoneCliente: editValues.telefoneCliente,
              emailCliente: editValues.emailCliente,
              nascimentoCliente: editValues.nascimentoCliente,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteClient = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListClientes(
        props.listClientes.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="ID: "
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nomeCliente"
            label="Nome do Cliente"
            defaultValue={props.nomeCliente}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="telefoneCliente"
            label="Telefone"
            defaultValue={props.telefoneCliente}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="emailCliente"
            label="E-mail do Cliente"
            defaultValue={props.emailCliente}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
                    <TextField
            autoFocus
            margin="dense"
            id="nascimentoCliente"
            label="Data de Nascimento:"
            defaultValue={props.nascimentoCliente}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteClient()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditClient()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}