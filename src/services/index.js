'use strict';
const item = require('./item');
const listitem = require('./listitem');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(listitem);
  app.configure(item);
};
