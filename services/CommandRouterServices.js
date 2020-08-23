const { createQuirk } = require('../controllers/QuirkController.js')
const { quirkAwaken } = require('../controllers/UserController.js')

const routes = {
    'awaken': quirkAwaken,
    'addquirk': createQuirk
}

const router = {
    router: (message)=>{
        if(message.author.bot) return;
  
        if(message.content.toLowerCase().indexOf(global.config.prefix.toLowerCase()) !== 0) return;
        const args = message.content.slice(global.config.prefix.length).split(" ");
        const message_value = message.content.slice(global.config.prefix.length).replace(args[0], '');
        routes[args[0]](message, args, message_value)
    }
}
module.exports = router