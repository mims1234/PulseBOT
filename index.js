//Rainbow BOT code
const BotPrefix = require("./prefix.json");
const BotTokenFile = require("./token.json");
const Discord = require("discord.js");

const fs = require("fs");
const ms = require("ms");

const bot =  new Discord.Client();
bot.commands = new Discord.Collection();

let propsCountC = 0;
fs.readdir("./commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./commands/${f}`);
            propsCountC = propsCountC + 1
            bot.commands.set(props.help.name, props);
    })
    console.log(propsCountC+' files loaded in [ commands ] folder')
});

//Bot Start
bot.on("ready" , async () => {
    console.log(`${bot.user.username} is online !`);
    if(!bot.on) return console.log("nodemon index.js")
    bot.user.setActivity("with Colors", {type :"PLAYING"});
});

//Bot Message input initiation
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

let prefix = BotPrefix.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

//Prefix Checker for Folder commands
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }

    if(cmd === `${prefix}yello`)
    {
        message.channel.send('Jello bish')
    }

});
//Key To Run BOT
bot.login(BotTokenFile.token);