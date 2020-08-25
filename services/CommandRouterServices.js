const { createQuirk } = require('../controllers/QuirkController.js')
const User = require('../models/user.js')
const { quirkAwake, chooseAlignment, changeName } = require('../controllers/UserController.js')

const routes = {
    'awake': quirkAwake,
    'addquirk': createQuirk,
    'choose': chooseAlignment,
    'name': changeName
} 

const router = {
    router: async (message)=>{
        if(message.author.bot) return;
  
        if(message.content.toLowerCase().indexOf(global.config.prefix.toLowerCase()) !== 0) return;

        const args = message.content.slice(global.config.prefix.length).split(" ");
        const message_value = message.content.slice(global.config.prefix.length).replace(args[0] + ' ', '');
        var error;
        var user; 
        if (typeof routes[args[0]] === 'undefined') {
            error = "This command doesn't exist, type %help to more informations."
        }
        if(args[0] != 'awake'){
            user = await User.findOne({userId: message.author.id})
            if (typeof user === 'undefined') {
                error = "Type $awake to awaken your power"
            }
        }
        if (error) {
            message.channel.send(error)
            return
        }
        routes[args[0]]({message, args, message_value, user})
    }
}
module.exports = router