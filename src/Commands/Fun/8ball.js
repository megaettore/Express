const Command = require('../../Structures/Command');
const request = require('request');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Replies to your questions...",
            usage: "<question>",
            category: "Fun"
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
        const question = args.slice(0).join(' ');
        if(!question) return message.channel.send("Non hai fatto una domanda..");
        const url = 'https://8ball.delegator.com/magic/JSON/' + question;
        request(url, function(err, response, body) {
            if(err) {
                message.channel.send("8ball non riesce o non vuole rispondere, prova più tardi e magari con una domanda più intelligente.");
            }
            body = JSON.parse(body);
            let embedColor = `RANDOM`;
            if(body.magic.type === "Affirmative") embedColor = "#0dba35";
            if(body.magic.type === "Contrary") embedColor = "#ba0d0d";
            if(body.magic.type === "Neutral") embedColor = "#6f7275";
            const eightBallEmbed = new Discord.MessageEmbed()
            .setTitle("8ball")
            .setColor(embedColor)
            .setThumbnail(message.author.avatarURL)
            .addField("Question: ", question, false)
            .addField("Asked by: ", message.author.tag, false)
            .addField("Reply: ", body.magic.answer, false)
            .setFooter("API provided by Delegator 8ball");
            message.channel.send(eightBallEmbed);
        });
    }
}