const { oneLine } = require('common-tags');
const Commando = require('discord.js-commando');

const { db, getUser, levelUp } = require('../db');

const game = require('../game.json');

const Command = Commando.Command;

module.exports = class SubmitCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'submit',
			group: 'ctf',
			memberName: 'submit',
			description: 'submit a flag',
			throttling: {
				usages: 5,
				duration: 10
      },
      args: [{
        key: 'flag',
        label: 'flag',
        prompt: 'What is the flag?',
        type: 'string',
        default: '',
      }]
		});
	}

	run(msg, { flag }) {
    if (msg.channel.type !== 'dm') {
      msg.author.createDM().then(c => c.send('You can only use this command in direct message'));
      msg.delete();
      return;
    }

    const user = getUser(msg.author);

    if (flag === '') {
      msg.reply(`Please provide a flag for level ${user.level} by doing \`submit [flag]\``);
      return;
    }

    if (flag !== game.flags[user.level]) {
      msg.reply(`Incorrect flag. Try Harder!`);
      return;
    }

    levelUp(user);

    return msg.reply(oneLine`
      Correct flag. Congratulations!
      Do \`geturl\` to get the next url or do \`scoreboard\` to check your ranking.
    `);
	}
};