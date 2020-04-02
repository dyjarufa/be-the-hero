const express = require('express');
const { celebrate, Joi, Segments, } = require('celebrate');

const  OngControllers = require('./controllers/OngControllers');
const  IncidentsControllers = require('./controllers/IncidentController');
const  ProfileControllers = require('./controllers/ProfileController');
const  SessionControllers = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngControllers.index);

routes.post('/ongs', celebrate({ 
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(11).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngControllers.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileControllers.index);

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionControllers.create);

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentsControllers.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentsControllers.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentsControllers.delete);

module.exports = routes; //Forma de exportar uma variável