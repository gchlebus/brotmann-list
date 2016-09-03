'use strict';

const app = require('./app');
//const port = app.get('port');
app.set('port', (process.env.PORT || 5000));
app.set('databaseurl', (process.env.DATABASE_URL || 'localhost'));
app.set('databasename', (process.env.DATABASE_NAME || 'gchlebus'));
app.set('user', (process.env.DATABASE_USER || 'gchlebus'));
app.set('password', (process.env.DATABASE_PASSWORD || ''));
console.log('databaseurl: ', app.get('databaseurl'));

const port = app.get('port');
const server = app.listen(port);
server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
