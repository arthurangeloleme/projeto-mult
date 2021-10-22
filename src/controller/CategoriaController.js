const { response } = require("express");
const { v4: uuid } = require("uuid");
const { update } = require("../models/Categoria");
const Categoria = require("../models/Categoria");

module.exports = {
  async index(request, response){
    try {
      const categorias = await Categoria.find();
      return response.status(200).json({ categorias });
    }catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response){
    const { codigo, nome } = request.body;
  
    if( !codigo || !nome ){
      return response.status(400).json({ error: "Missing codigo or nome"})
    }

    const categoria = new Categoria({
      _id: uuid(),
      codigo,
      nome
    })

    try {
      await categoria.save();
      return response.status(201).json({ massage: "Categoria added succesfully!"})
    }catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { codigo, nome } = request.body;
    const dataDeModificacao = Date.now();

    if( !codigo && !nome ) {
      return response.status(400).json({ error: "You must inform a new codigo or a new nome" });
    }

    if(codigo) response.categoria.codigo = codigo;
    if(nome) response.categoria.nome = nome;
    if(dataDeModificacao != null) response.categoria.dataDeModificacao = dataDeModificacao;

    try{
      await response.categoria.save();
      return response.status(200).json({ message: "Categoria updated successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.categoria.remove();
      return response.status(200).json({ message: "Categoria deleted successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};