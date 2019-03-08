const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const config = require('./config.json');
const game = require('./game.json')

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ 
  users: {},
}).write();

function getUser(user) {
  let dbUser = db.get('users').find({id: user.id}).value();
  
  if (dbUser !== undefined) return dbUser;

  dbUser = {
    name: user.username,
    id: user.id,
    level: 0,
    score: 0,
    hints: new Array(game.challengeCount).fill(0),
  };

  db
    .get('users')
    .set(user.id, dbUser)
    .write();
  
  return dbUser;
}

function levelUp(user) {
  db
    .update(`users.${user.id}.level`, n => n + 1)
    .update(`users.${user.id}.score`, n => n + game.points[user.level])
    .write();
}

function getRank() {
  return db.get('users').sortBy('score').value();
}

module.exports = {
  db,
  getUser,
  levelUp,
  getRank
};