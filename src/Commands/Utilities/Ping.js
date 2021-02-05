const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'This provides the ping of the bot',
			category: 'Utilities'
		});
	}

	async run(message) {
		const msg = await message.channel.send('Ping in corso...');

		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Allora è uscito il risultato?', 'Tutto ok?Io non posso leggere cazzarola', 'Speriamo bene!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
	}

};
