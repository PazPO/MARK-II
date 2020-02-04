'use strict';
var WebSocketServer = new require('ws');
const db = require('./api/db.js');
const { postgresConfig } = require('./secret/secret.js');
const pg = db.open(postgresConfig);
let mess = '';
// подключённые клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
webSocketServer.on('connection', function (ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function (message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      pg.select('pg_tables')
        .where({ tableowner: 'marcus', schemaname: 'public' })
        .fields(['schemaname', 'tablename', 'tableowner', 'hasindexes'])
        .order('tablename')
        .then(rows => {
          rows.forEach(row => {
            mess = mess + row.tablename + '\n';
          });
          clients[key].send(mess);
          //console.table(rows);
          pg.close();
        });
    }
  });
  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });


});