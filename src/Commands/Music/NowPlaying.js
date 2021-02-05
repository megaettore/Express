const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['np'],
            description: "Shows informations about current playing track",
            category: "Music"
        });
    }

    async run(message) {
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("Nessuna canzone in ascolto");
        const { title, author, description, thumbnail, url, duration } = player.queue[0];

        const embed = new MessageEmbed()
        .setAuthor("In ascolto:", message.author.displayAvatarURL)
        .setThumbnail(thumbnail)
        .setDescription(stripIndents`
        ${player.playing ? "▶" : "⏸"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}\n${url}
        `)
        .setColor("RANDOM");

        return message.channel.send(embed);
    }
}