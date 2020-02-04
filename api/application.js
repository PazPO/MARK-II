'use strict';
 
const db = require('./db.js');
const { postgresConfig } = require('../secret/secret.js');
  
const pg = db.open(postgresConfig);
let mess='';

//console.dir({ pg });

pg.select('pg_tables')
  .where({ tableowner: '=marcus', schemaname: '=public' })
  .fields(['schemaname', 'tablename', 'tableowner', 'hasindexes'])
  .order('tablename')
  .then(rows => {
    mess=rows;
    //console.table(rows);
    pg.close();
  });
  return mess;
