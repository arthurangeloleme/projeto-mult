const { response } = require("express");
const { v4: uuid } = require("uuid");
const { update } = require("../models/Cliente");
const Cliente = require("../models/Cliente");

//message: props => 'You must be 18 years old.'

module.exports = {
  async index(request, response){
    try {
      const clientes = await Cliente.find();
      return response.status(200).json({ clientes });
    }catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response){
    const { codigo, nome, dataDeNascimento, cidade, estado, email } = request.body;
  
    if( !codigo || !nome || !dataDeNascimento || !cidade || !estado || !email ){
      return response.status(400).json({ error: "Missing codigo, nome, dataDeNascimento, cidade, estado or email"})
    }

    const cliente = new Cliente({
      _id: uuid(),
      codigo,
      nome,
      dataDeNascimento,
      cidade,
      estado,
      email
    })

    try {
      await cliente.save();
      return response.status(201).json({ massage: "Cliente added succesfully!"})
    }catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { codigo, nome, dataDeNascimento, cidade, estado, email } = request.body;
    const dataDeModificacao = Date.now();

    if(!codigo && !nome && !dataDeNascimento && !cidade && !estado && !email) {
      return response.status(400).json({ error: "You must inform a new codigo or a new nome or a new descrição" });
    }

    /*if (dataDeNascimento) {
      return response.status(400).json({ error: "You informed an age less than 18 years old" });
    }*/

    if(codigo) response.cliente.codigo = codigo;
    if(nome) response.cliente.nome = nome;
    if(dataDeNascimento) response.cliente.dataDeNascimento = dataDeNascimento;
    if(cidade) response.cliente.cidade = cidade;
    if(estado) response.cliente.estado = estado;
    if(email) response.cliente.email = email;
    if(dataDeModificacao != null) response.cliente.dataDeModificacao = dataDeModificacao;

    try{
      await response.cliente.save();
      return response.status(200).json({ message: "cliente updated successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }


  },

  async delete(request, response) {
    try {
      await response.cliente.remove();
      return response.status(200).json({ message: "cliente deleted successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};