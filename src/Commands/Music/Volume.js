const Command = require('../../Structures/Command');
const options = require('../../../config');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["v"],
            description: "Sets the player's volume",
            category: "Music",
            usage: "<volume>"
        });
    }

    async run(message, args) {
        return message.reply("Aumentare il volume incrementa notevolmente l'utilizzo della CPU sul server hosting e potrebbe causare picchi di lag sul server, fai attenzione.");
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("Devi stare nella stanza vocale in cui mi trovo, cojon!");
        if(!player || !player.queue[0]) return message.channel.send("Il problema non è il volume, se non senti nulla è perchè non c'è niente da ascoltare.Ma chi ce li manda questi?");
        if(!args[0]) return message.channel.send(`Volume corrente: **${player.volume}%**`);
        if(Number(args) <= 0 || Number(args) > 100) return message.channel.send("Puoi impostare il volume da 1 a 100");
        player.setVolume(Number(args));
        return message.channel.send(`Volume impostato a: **${player.volume}%**`);
    }
}