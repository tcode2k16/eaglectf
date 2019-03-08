const { oneLine } = require('common-tags');
const Commando = require('discord.js-commando');

const { db, getUser } = require('../db');

const game = require('../game.json');

const Command = Commando.Command;

module.exports = class GeturlCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'geturl',
			aliases: ['url'],
			group: 'ctf',
			memberName: 'geturl',
			description: 'Get the url for the next challenge',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}


	run(msg) {
		if (msg.channel.type !== 'dm') {
      msg.author.createDM().then(c => c.send('You can only use this command in direct message'));
      msg.delete();
      return;
		}
		
		const user = getUser(msg.author);

		if (user.level > game.maxLevel) return msg.reply('Good Job! You finished all the challenges.');
		
		return msg.reply(oneLine`
			here is your next challenge: 	
			${game.urls[user.level]}
		`);
	}
};