const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['stop'],
            description: "Stops current playing track",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);

        if(channel && channel.id !== player.voiceChannel.id) return message.channel.send("Devi stare in una stanza vocale prima, cojon!");
        if(!player) return message.channel.send("Sarà che non ho le orecchie, ma non sento canzoni da fermare");

        this.client.music.players.destroy(message.guild.id);
        return message.channel.send("La canzone è stata arrestata per colpa tua..spia di merda!Meglio che vado, prima che fai arrestare anche me.");
    }
}