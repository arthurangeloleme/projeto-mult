const { response } = require("express");
const { validate: isUuid } = require("uuid");
const Produto = require("../models/Produto");

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)){
      return response.status(400).json({ error: "Invalid ID." });
    }

    try {
      const produto = await Produto.findById(id);
      response.produto = produto;
      if(!produto) {
        return response.status(404).json({ error: "Produto not found." });
      }
    } catch(err){
      return response.status(500).json({ error: err.message });
    }
    next();
  },
};