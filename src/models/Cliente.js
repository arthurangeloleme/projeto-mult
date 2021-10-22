const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
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
  dataDeNascimento:{
    type: Date,
    validate: {
      validator: function(v) {
        v.setFullYear(v.getFullYear()+18)
        const currentTime = new Date();
        currentTime.setHours(0,0,0,0);
        return v.getTime() <= currentTime.getTime();
      },
      message: props => 'You must be 18 years old.'
    },
    required: true
},
  cidade:{
    type: String,
    required: false,
  },
  estado:{
    type: String,
    required: false,
  },
  email:{
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

module.exports = mongoose.model("Cliente", clienteSchema);