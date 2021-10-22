const { response } = require("express");
const { v4: uuid } = require("uuid");
const { update } = require("../models/Produto");
const Produto = require("../models/Produto");

module.exports = {
  async index(request, response){
    try {
      const produtos = await Produto.find();
      return response.status(200).json({ produtos });
    }catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response){
    const { codigo, nome, descricao, } = request.body;
  
    if( !codigo || !nome || !descricao ){
      return response.status(400).json({ error: "Missing codigo or nome or descricao"})
    }

    const produto = new Produto({
      _id: uuid(),
      codigo,
      nome,
      descricao
    })

    try {
      await produto.save();
      return response.status(201).json({ massage: "Produto added succesfully!"})
    }catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { codigo, nome, descricao } = request.body;
    const dataDeModificacao = Date.now();

    if(!codigo && !nome && !descricao) {
      return response.status(400).json({ error: "You must inform a new codigo or a new nome or a new descrição" });
    }

    if(codigo) response.produto.codigo = codigo;
    if(nome) response.produto.nome = nome;
    if(descricao) response.produto.descricao = descricao;
    if(dataDeModificacao != null) response.produto.dataDeModificacao = dataDeModificacao;

    try{
      await response.produto.save();
      return response.status(200).json({ message: "Produto updated successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.produto.remove();
      return response.status(200).json({ message: "Produto deleted successfully!"});
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
};