const {Client, RichEmbed} = require("discord.js");
require('dotenv').config()
var schedule = require('node-schedule');
const { router } = require("./services/CommandRouterServices");
const { restAllUsers } = require("./controllers/UserController");

const client = new Client();
global.config = {
  "token": process.env.TOKEN,
  "prefix" : process.env.PREFIX
}

client.on("ready", () => {
  client.user.setActivity(`%help`);
  schedule.scheduleJob("24 * * * *", async ()=>{
    restAllUsers()
  });  
});

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

client.on("message", async message => {
    router(message)
});

client.login(global.config.token);
