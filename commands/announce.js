const discord = require("discord.js");
const util = require('../utilities');
const config = require('../config.json');

module.exports = {
    name: 'announce',
    description: 'Says a message in a specified channel.',
    usage: `<channel-name> <message>`,
    requiredPermissions: ['MANAGE_MESSAGES'],

    execute(bot, message, args, userFromMention) {
        var lookingFor = args.shift();

        if (!lookingFor) {
            throw new InvalidUsageException();
        }

        sendingChannel = util.getChannelFromMention(message, lookingFor);
        if (!sendingChannel) {
            message.channel.send(`Invalid channel: ${lookingFor}`);
            return;
        }

        if (args.length < 1) {
            throw new InvalidUsageException();
        }

        sendingChannel.send(args.join(" "))
            .catch(error => message.reply(`Error: ${error}`));
    }
}