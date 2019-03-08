const { oneLine } = require('common-tags');
const Commando = require('discord.js-commando');

const { getRank, getUser } = require('../db');

const { table } = require('table');

const Command = Commando.Command;

module.exports = class ScoreboardCommand extends Command {
	constructor(client) {
		super(client, {
      name: 'scoreboard',
      aliases: ['score'],
			group: 'ctf',
			memberName: 'scoreboard',
			description: 'check out the scoreboard',
			throttling: {
				usages: 5,
				duration: 10
      },
		});
	}

	run(msg, { flag }) {
    if (msg.channel.type !== 'dm') {
      msg.author.createDM().then(c => c.send('You can only use this command in direct message'));
      msg.delete();
      return;
    }

    let author = getUser(msg.author);

    let output = [];
    output.push(['No.', 'username', 'score', 'level']);
    const rank = getRank();

    let i = 1;
    for (let j = rank.length-1; j >= 0; j--) {
      let user = rank[j];
      if (user.id === author.id) {
        output.push(['*'+i+'*', user.name, user.score, user.level]);
      } else {
        output.push([i, user.name, user.score, user.level]);
      }
      
      i++;
    }

    return msg.reply('`'+table(output)+'`');
	}
};