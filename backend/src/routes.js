const express = require("express");

const SessionsController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const IcidentController = require("./controllers/IcidentController");
const ProfileController = require("./controllers/ProfileController");

const routes = express.Router();

routes.post("/session", SessionsController.create);

routes.get("/ongs", OngController.index);
routes.get("/profile", ProfileController.index);

routes.post("/ongs", OngController.create);

routes.post("/incidents", IcidentController.create);
routes.get("/incidents", IcidentController.index);
routes.delete("/incidents/:id", IcidentController.delete);

module.exports = routes;
