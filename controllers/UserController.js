const User = require('../models/user')
const Quirk = require('../models/quirk')
const {randomQuirk} = require('../controllers/QuirkController')
const Discord = require('discord.js');

const alignments = ['hero', 'villain']

const userController = {
    quirkAwake: async (params)=>{
        try {
            var user = await User.findOne({userId: params.message.author.id, serverId: params.message.guild.id});
            console.log(params.message)
            if (!user) {
                user = await User.create({
                    name: params.message.author.username,
                    userId: params.message.author.id,
                    serverId: params.message.guild.id
                })
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
            } else {
                var alignment = params.args[1].toLowerCase()

                if (alignments.includes(alignment) ) {
                    params.user.alignment = alignment;
                    params.user.save()
                    params.message.channel.send(`${typeof params.user.name !== "undefined" ? params.user.name : 'You' } just became a **${alignment}**!!!!!`)
                    return;
                } else{
                    error = `Invalid alignment, use hero ou villain`;
                }
            }
            params.message.channel.send(error)
        } catch (error) {
            console.log(error)
        }
    },
    changeName: async(params)=>{
        try {
            if(params.args.slice(1).join(" ").length > 30) {
                params.message.channel.send("too long of a name shounen!")
                return;
            }
            params.user.name  = params.args.slice(1).join(" ");
            params.user.save()
        } catch (error) {
            console.log(error.code)
        }
    },
    restAllUsers: async()=>{
        await User.updateMany({stamina: { $lt: 5} }, {$inc : {stamina : 1}})
    },
    heroes: async(params)=>{
        var heroes = await User.find({serverId: params.message.channel.guild.id, alignment: 'hero'})
        console.log(heroes)
        var heroesEmbed = heroes.map((hero)=>{
            return {name: '#Rank WIP', value: `**${hero.name}** - Agency WIP`}
        })
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Top heroes')
        .addFields(
            heroesEmbed
        )
       params.message.channel.send(embed);

    },
    villains: async(params)=>{
        var heroes = await User.find({serverId: params.message.channel.guild.id, alignment: 'villain'})
        var heroesEmbed = heroes.map((hero)=>{
            return {name: '#Rank WIP', value: `**${hero.name}** - Agency WIP`}
        })

        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Top villains')
        .addFields(
            heroesEmbed
        )
       params.message.channel.send(embed);
    },
    stamina: async(params)=>{
        var zapzapzapzapzapzap = '';
        for (let index = 0; index < params.user.stamina; index++) {
            zapzapzapzapzapzap += '⚡'
        }
        if (zapzapzapzapzapzap == '') {
            params.message.channel.send(`You have no stamina. Wait the resting time, every hour, to ragain a stamina point.`)
            return;
        }
        params.message.channel.send(`Your stamina: ${zapzapzapzapzapzap}`)
    },
    profile: async params => {
        var user = await User.find({userId: params.message.author.id}).populate("quirk")
        console.log(user[0])
        const discEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user[0].name)
            .addFields(
                { name: "**alignment**", value: user[0].alignment.toUpperCase() },
                { name: '\u200B', value: '\u200B' },
                { name: ("**agility**: " + user[0].agility), value: "\u200B" },
                { name: ("**defence**: " + user[0].defence), value: "\u200B" },
                { name: ("**attack**: " + user[0].attack), value: "\u200B" },
                { name: ("**power**: " + user[0].power), value: "\u200B" },
                { name: ("**defence power**: " + user[0].defence_power), value: "\u200B" },
                { name: ("**precision**: " + user[0].precision), value: "\u200B" },
                { name: ("**utility**: " + user[0].utility), value: "\u200B" }
            )

        params.message.channel.send("profileeee:"+  user[0])
    }
}
module.exports = userController