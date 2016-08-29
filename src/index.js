'use strict';

const app = require('./app');
//const port = app.get('port');
app.set('port', (process.env.PORT || 5000));

const port = app.get('port');
const server = app.listen(port);
server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
