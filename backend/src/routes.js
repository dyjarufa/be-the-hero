const express = require('express');
const  OngControllers = require('./controllers/OngControllers');
const  IncidentsControllers = require('./controllers/IncidentController');
const  ProfileControllers = require('./controllers/ProfileController');
const  SessionControllers = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngControllers.index);
routes.post('/ongs', OngControllers.create);

routes.get('/profile', ProfileControllers.index);

routes.post('/sessions', SessionControllers.create);

routes.post('/incidents', IncidentsControllers.create);
routes.get('/incidents', IncidentsControllers.index);
routes.delete('/incidents/:id', IncidentsControllers.delete);

module.exports = routes; //Forma de exportar uma variável