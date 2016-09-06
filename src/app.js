'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const Sequelize = require('sequelize');

const app = feathers();

app.set('databaseurl', (process.env.DATABASE_URL || 'postgres://gchlebus@localhost:5432/gchlebus'));
console.log("URL", app.get('databaseurl'));
const sequelize = new Sequelize(app.get('databaseurl'), {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  native: true,
  ssl: true
});


app.set('sequelize', sequelize);

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);


var lists = app.service('lists');
lists.find({
  query: {}
}).then(function(result){
  console.log(result);
  if (result.total == 0){
    lists.create({
      title: "list"
    });
  }
});

module.exports = app;
