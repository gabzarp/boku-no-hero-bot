const Quirk = require('../models/quirk')
const User  = require('../models/user')
const quirkController = {
    createQuirk: async (message, args, message_value)=>{
        try {
            message_values = message_value.split('%')
           console.log(message_values)
            var quirk = {
                name: message_values[0],
                description: message_values[1],
                type: message_values[2],
                defence: message_values[3],
                attack: message_values[4],
                crit_chance: message_values[5],
                control_chance: message_values[6],
                agility: message_values[7],
                precision: message_values[8],
                primary_function: message_values[9]
            }
            var quirk = await Quirk.create(quirk);
            message.channel.send("Nova quirk: " + quirk)
        } catch (error) {
            console.log(error)
        }
    },
    randomQuirk: async ()=>{
        var count = await Quirk.countDocuments();
        var random = Math.floor(Math.random() * count)
        var randomQuirk = await Quirk.findOne().skip(random);
        return randomQuirk;
    }
}
module.exports = quirkController