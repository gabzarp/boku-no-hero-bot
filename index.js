const {Client, RichEmbed} = require("discord.js");
require('dotenv').config()
const { router } = require("./services/CommandRouterServices");

const client = new Client();
global.config = {
  "token": process.env.TOKEN,
  "prefix" : process.env.PREFIX
}

client.on("ready", () => {
  client.user.setActivity(`%`);
});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

client.on("message", async message => {
    router(message)
});

client.login(global.config.token);
