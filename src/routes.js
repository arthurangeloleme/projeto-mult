const express = require("express");
const routes = express.Router();

const ProdutoController = require("./controller/ProdutoController");
const ProdutoMiddleware = require("./middlewares/ProdutoMiddleware");

routes.get("/produtos", ProdutoController.index);
routes.post("/produtos", ProdutoController.store);

routes.put("/produtos/:id", ProdutoMiddleware.validateId, ProdutoController.update);
routes.delete("/produtos/:id", ProdutoMiddleware.validateId, ProdutoController.delete);

const CategoriaController = require("./controller/CategoriaController");
const CategoriaMiddleware = require("./middlewares/CategoriaMiddleware");

routes.post("/categorias", CategoriaController.store);

routes.put("/categorias/:id", CategoriaMiddleware.validateId, CategoriaController.update);

const ClienteController = require("./controller/ClienteController");
const ClienteMiddleware = require("./middlewares/ClienteMiddleware");

routes.get("/clientes", ClienteController.index);
routes.post("/clientes", ClienteController.store);

routes.put("/clientes/:id", ClienteMiddleware.validateId, ClienteController.update);


module.exports = routes;