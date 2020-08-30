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
    train: (params)=>{
        if (Math.random() < 0.05) {
            params.message.channel.send(`Infelizmente por causa do caue você não ganhou status`)
            return;
        }
        if (params.user.stamina <= 0) {
            params.message.channel.send(`You do not have enough stamina!`) 
            return;
        } 

        var randomStatus = status[Math.floor(Math.random() * status.length)]
        // console.log((Math.log(params.user.trained) + 1) * 20)
        // params.user[randomStatus] = (Math.log(params.user.trained) + 1) * 4.4
        params.user.stamina += -1;
        params.user.trained += 1;
        params.user.save()
        params.message.channel.send(`Something you get for being lucky and something you get for being recognized are totally different things. Good job, shounen! \n Your **${randomStatus.replace("_", " ")}** status increased.`)
    }
}