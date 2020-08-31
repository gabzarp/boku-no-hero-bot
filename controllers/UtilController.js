const Discord = require("discord.js")

const commands = [{
    name: '\u200B',
    value: '\u200B'
},{
    value: `**${process.env.PREFIX}awake**`,
    name: `• **${process.env.PREFIX}awake**: Awaken your quirk`
},{
    value: `**${process.env.PREFIX}profile** <usuario> || **${process.env.PREFIX}profile**`,
    name: `• **${process.env.PREFIX}profile**: Shows your profile or another user's.`
},{
    value: `**${process.env.PREFIX}quirk** <usuario> || **${process.env.PREFIX}quirk**`,
    name: `• **${process.env.PREFIX}quirk**: veja qual seu quirk`
}, {
    value: `**${process.env.PREFIX}train**`,
    name: `• **${process.env.PREFIX}train**: Train to become more powerful. (Needs 1 Stamina)`
},{
    value: `**${process.env.PREFIX}duel** <usuario>`,
    name: `• **${process.env.PREFIX}duel**: Challenge an opponent to combat. (Needs 1 Stamina)`
},{
    value: `**${process.env.PREFIX}choose** <alignment>`,
    name: `• **${process.env.PREFIX}choose**: escolha se quer ser herói ou vilão`
},{
    value: `**${process.env.PREFIX}name** <name>`,
    name: `• **${process.env.PREFIX}name**: Choose your hero or villain name.`
},{
    value: `**${process.env.PREFIX}heroes**`,
    name: `• **${process.env.PREFIX}heroes**: Shows a list of server heroes.`
},{
    value: `**${process.env.PREFIX}villains**`,
    name: `• **${process.env.PREFIX}villains**: Shows a list of server villains.`
},{
    value: `**${process.env.PREFIX}stamina**`,
    name: `• **${process.env.PREFIX}stamina**: Shows your current stamina.`
}]

const utilController = {
    help: async (params) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Command list")
            .addFields(commands)
            .setThumbnail('https://i.imgur.com/WdgxEnF.png')
        
        params.message.channel.send(embed);
    }
}

module.exports = utilController;
