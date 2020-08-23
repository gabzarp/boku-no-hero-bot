const User = require('../models/user')
const Quirk = require('../models/quirk')
const {randomQuirk} = require('../controllers/QuirkController')
const userController = {
    quirkAwaken: async (message, args, message_value)=>{
        try {
            var user = await User.findOne({userId: message.author.id});
            if (!user) {
                user = await User.create({userId: message.author.id})
            }
            user.quirk = await randomQuirk();
            user.save()
            message.channel.send("Quirk acordô :) : " + user)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = userController