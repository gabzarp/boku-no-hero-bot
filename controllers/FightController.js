const User = require("../models/user")
const { Message } = require("discord.js")

const statusRolls = {
    'attack': 'defence',
    'power': 'defence_power',
    'agility': 'precision'
}

module.exports = {
    duel: async (params)=>{
        var message = await params.message.channel.send(`<@!${params.user.userId}> is challenging ${params.args[1]}`)
        if (typeof params.args[1] === 'undefined') {
            message.channel.send(`You didn't challange anyone. Correct sintax: %duel '@username'.`);
            return;
        }
        
        var enemy = await User.findOne({userId : params.args[1].replace("<@!", "").replace(">", "")})
        if (!enemy) {
            message.channel.send(`Challenger doesn't have a quirk.`);
            return;
        }
        await message.react('👍')
        await message.react('👎')

        await message.awaitReactions((reaction, user) => user.id == enemy.userId && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
        { max: 1, time: 30000 }).then(async collected => {
                if (collected.first().emoji.name == '👍') {
                    var points = await Object.keys(statusRolls).reduce(async (points, status)=>{
                        points = await points + (Math.random() * (params.user[status] - enemy[statusRolls[status]]))
                        points = await points + (Math.random() * (enemy[statusRolls[status]] - params.user[status]))
                        return points
                    }, Promise.resolve(0))
                    var winner =  points > 0 ? params.user.name : enemy.name
                    
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