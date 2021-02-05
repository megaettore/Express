const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Skips to the next track in the queue",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("Devi stare nella stanza vocale in cui mi trovo, cojon!");
        if(!player || !player.queue[0]) return message.channel.send("Sarà che non ho le orecchie, ma non sento canzoni da "skippare".");
        player.stop();
        return message.channel.send("Canzone saltata come da richiesta");
    }
}