'use strict';

const service = require('feathers-sequelize');
const list = require('./list-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: list(app.get('sequelize')),
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/lists', service(options));

  // Get our initialize service to that we can bind hooks
  const listService = app.service('/lists');

  // Set up our before hooks
  listService.before(hooks.before);

  // Set up our after hooks
  listService.after(hooks.after);
};
