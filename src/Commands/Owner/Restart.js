const Command = require('../../Structures/Command');
const config = require('../../../config');
const ExpressClient = require('../../Structures/ExpressClient');
const newClient = new ExpressClient(config);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Restart the bot",
            category: "Owner"
        });
    }

    async run(message) {
        if (!this.client.owners.includes(message.author.id)) return message.channel.send("Solo el efe può riavviarmi!");
        const msg = await message.channel.send("*Restart del bot fra 5 secondi, potrebbe impiegarci un po prima di ripartire...*");
        setTimeout(() => {
            msg.delete()
            .then(this.client.destroy())
            .then(newClient.start());
        }, 5000);
    }
}