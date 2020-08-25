const User = require('../models/user')
const Quirk = require('../models/quirk')
const {randomQuirk} = require('../controllers/QuirkController')

const alignment = ['hero', 'vilain']

const userController = {
    quirkAwake: async (params)=>{
        try {
            var user = await User.findOne({userId: params.message.author.id});
            if (!user) {
                user = await User.create({userId: params.message.author.id})
            }
            user.quirk = await randomQuirk();

            user.defence = user.quirk.defence,
            user.attack = user.quirk.attack,
            user.power = user.quirk.power,
            user.defence_power = user.quirk.defence_power,
            user.agility = user.quirk.agility,
            user.precision = user.quirk.precision,
            user.utility = user.quirk.utility

            user.save()

            params.message.channel.send("Quirk acordô :) : " + user)

        } catch (error) {
            console.log(error)
        }
    },
    chooseAlignment: async(params)=>{
        try {
            var error;
            if (typeof params.user.alignment !== 'undefined') {
                error = `User is already a ${params.user.alignment}`;
            }
            else{
                var alignment = params.args[1].toLowerCase()
                if (alignment.includes(alignment) ) {
                    params.user.alignment = alignment;
                    params.user.save()
                    params.message.channel.send(`${typeof params.user.name !== "undefined" ? params.user.name : 'You' } just became a ${ alignment }!!!!!`)
                    return;
                }
                else{
                    error = `Invalid alignment, use hero ou vilain`;
                }
            }
            params.message.channel.send(error)
        } catch (error) {
            console.log(error)
        }
    },
    changeName: async(params)=>{
        try {
            params.user.name  = params.args.slice(1).join(" ");
            params.user.save()
        } catch (error) {
            console.log(error.code)
        }
    }
}
module.exports = userController