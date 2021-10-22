const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true,
  },
  codigo:{
    type: String,
    required: true,
  },
  nome:{
    type: String,
    required: true,
  },
  descricao:{
    type: String,
    required: true,
  },
  categoriaID:{
    type: String,
    required: false,
  },
  dataDeCriacao:{
    type: Date, 
    default: Date.now,
  },
  dataDeModificacao: {
    type: Date, 
    default: Date.now,
  }
})

module.exports = mongoose.model("Produto", produtoSchema);