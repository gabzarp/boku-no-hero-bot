const Quirk = require('../models/quirk')
const User  = require('../models/user')
const quirkController = {
    createQuirk: async (params)=>{
        try {
            var message_values = params.message_value.split('%')
            var quirk = {
                name: message_values[0],
                description: message_values[1],
                defence: message_values[2],
                attack: message_values[3],
                power: message_values[4],
                defence_power: message_values[5],
                agility: message_values[6],
                precision: message_values[7],
                utility: message_values[8]
            }
            var quirk = await Quirk.create(quirk);
            params.message.channel.send("Nova quirk: " + quirk)
        } catch (error) {
            console.log(error)
        }
    },
    randomQuirk: async ()=>{
        var count = await Quirk.countDocuments();
        var random = Math.floor(Math.random() * count)
        var randomQuirk = await Quirk.findOne().skip(random);
        return randomQuirk;
    },
    myQuirk: async (params) => {
        var user = await User.find({ userId: params.message.mentions.users.first() ? params.message.mentions.users.first().id : params.message.author.id }).populate('quirk')
        
        params.message.channel.send(`${params.message.mentions.users.first() ? params.message.mentions.users.first().username : params.message.author.username}'s quirk: ${user[0].quirk}`)
    }
}
module.exports = quirkController