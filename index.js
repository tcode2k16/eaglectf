const Commando = require('discord.js-commando');
const path = require('path');

const config = require('./config.json')

const client = new Commando.Client({
  owner: '363949433706119168'
});

client.registry
  .registerGroups([
    ['ctf', 'Main commands for the eaglectf'],
  ])
  .registerDefaults()
  .registerCommand(require('./commands/geturl'))
  .registerCommand(require('./commands/submit'));
  // .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('error', err => {
  console.log(err);
});

client.login(config.token);
