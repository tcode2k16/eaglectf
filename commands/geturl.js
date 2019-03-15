const { oneLine } = require('common-tags');
const Commando = require('discord.js-commando');

const { table } = require('table');

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
			},
			args: [{
        key: 'isAll',
        label: 'getAllUrl',
        prompt: 'Do you want to see the urls for all the past levels? Do "geturl all".',
        type: 'string',
        default: '',
      }]
		});
	}


	run(msg, { isAll }) {
		if (msg.channel.type !== 'dm') {
      msg.author.createDM().then(c => c.send('You can only use this command in direct message'));
      msg.delete();
      return;
		}
		
		const user = getUser(msg.author);

		if (isAll === 'all') {
			let data = [['Level', 'URL']];
			let upperLimit = this.client.isOwner(msg.author) ? game.maxLevel-1 : user.level;
			upperLimit = Math.min(upperLimit, game.maxLevel-1);
			for (let i = 0; i <= upperLimit; i++) {
				data.push([`level ${i}`, game.urls[i]]);
			}
			return msg.reply(table(data), {
				split: true,
				code: true,
			});
		}

		if (user.level >= game.maxLevel) return msg.reply('Good Job! You finished all the challenges.');
		
		return msg.reply(oneLine`
			here is your next challenge: 	
			${game.urls[user.level]}
		`);
	}
};