const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const config = require('./config.json');
const game = require('./game.json')

const adapter = new FileSync('test.json');
const db = low(adapter);

db.defaults({ 
  ranking: [],
  users: {},
}).write();

op = db.get('users');
for (let i = 0; i < 10; i++) {
  console.log(i);
  op = op.set(''+i, { id: i });
}
op.write();
console.log(db.get('users').sortBy('id').take(5).value());
console.log(db.getState());