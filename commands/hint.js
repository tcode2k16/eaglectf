const { stripIndents } = require('common-tags');
const Commando = require('discord.js-commando');

const { getUser, unlockHint } = require('../db');

const { table } = require('table');

const game = require('../game.json');

const Command = Commando.Command;

module.exports = class HintCommand extends Command {
	constructor(client) {
		super(client, {
      name: 'hint',
			group: 'ctf',
			memberName: 'hint',
			description: 'get a hint for the challenge that you are working on',
			throttling: {
				usages: 5,
				duration: 10
      },
      args: [{
        key: 'confirm',
        label: 'confirm',
        prompt: 'Are you sure that you want to spend a point to receive a hint?',
        type: 'boolean',
        default: false,
      }]
		});
	}

  _getHints(user) {
    let data = [['hints']];
    for (let i = 0; i < user.hints; i++) {
      data.push([game.hints[user.level][i]]);
    }
    return table(data);
  }

	run(msg, { confirm }) {
    if (msg.channel.type !== 'dm') {
      msg.author.createDM().then(c => c.send('You can only use this command in direct message'));
      msg.delete();
      return;
    }

    let user = getUser(msg.author);

    if (user.level >= game.maxLevel) return msg.reply('Good Job! You finished all the challenges.');

    if (!confirm) {
      msg.reply(stripIndents`
        \`
        You can spend a point to receive an extra hint? Do "hint true".
        ${this._getHints(user)}
        \`
      `);
      return;
    }

    let output = '`';

    if (user.hints >= game.hints[user.level].length) {
      output += 'You got all the hints already\n';
    } else {
      unlockHint(user);
      user = getUser(user);
    }

    output += this._getHints(user);
    output += '`';

    return msg.reply(output);



    
	}
};