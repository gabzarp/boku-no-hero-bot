const Discord = require("discord.js")

const utilController = {
    help: async (params) => {
        const commands = [{
            sintax: `${process.env.PREFIX}awake`,
            message: `• **${process.env.PREFIX}awake**: acorda baianor`
        },{
            sintax: `${process.env.PREFIX}quirk <usuario> || ${process.env.PREFIX}quirk`,
            message: `• **${process.env.PREFIX}quirk**: veja qual seu quirk`
        }, {
            sintax: `${process.env.PREFIX}train`,
            message: `• **${process.env.PREFIX}train**: treina um status aleatório com 5% de chances de não conseguir evoluir nada (precisa de estamina para isso)`
        },{
            sintax: `${process.env.PREFIX}duel <usuario>`,
            message: `• **${process.env.PREFIX}duel**: inicie um combate com um oponente`
        },{
            sintax: `${process.env.PREFIX}choose <alignment>`,
            message: `• **${process.env.PREFIX}choose**: escolha se quer ser herói ou vilão`
        }]
        let response = ""
        commands.forEach(e => {
            response += e.message + "\n" + e.sintax + "\n\n"
        })
        params.message.channel.send(`ALL MIGHT \n\nComandos:\n\n${response}`);
    }
}

module.exports = utilController;
