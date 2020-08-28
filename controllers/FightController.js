const User = require("../models/user")
const { Message } = require("discord.js")

const status = [
    'defence',
    'attack',
    'power',
    'defence_power', 
    'agility', 
    'precision', 
    'utility'
]

module.exports = {
    duel: async (params)=>{
        var message = await params.message.channel.send(`<@!${params.user.userId}> is challenging ${params.args[1]}`)
        var enemy = await User.findOne({userId : params.args[1].replace("<@!", "").replace(">", "")})
        await message.react('👍')
        await message.react('👎')

        await message.awaitReactions((reaction, user) => user.id == enemy.userId && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
        { max: 1, time: 30000 }).then(async collected => {
                if (collected.first().emoji.name == '👍') {
                    var points = await status.reduce(async (points, status)=>{
                        if(params.user[status] >= enemy[status]){
                            points  = await points + 1
                        }
                        return points
                    }, Promise.resolve(0))
                    var winner =  points > 4 ? params.user.name : enemy.name
                    
                    enemy.name.stamina += -1
                    params.user.name.stamina += -1

                    enemy.save()
                    params.user.save()

                    message.channel.send(`${winner} won`);
                }
                else{ 
                    message.channel.send(`${params.args[1]} declined the duel.`);
                    return;
                }
        }).catch(() => {
            message.channel.send('No reaction after 30 seconds, operation canceled');
        });
    }
}