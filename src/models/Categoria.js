const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
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
  dataDeCriacao:{
    type: Date, 
    default: Date.now,
  },
  dataDeModificacao: {
    type: Date, 
    default: Date.now,
  }
})

module.exports = mongoose.model("Categoria", categoriaSchema);