const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {

    let CoolDown = JSON.parse(fs.readFileSync("./CoolDownMsg.json","utf8"));

    userlog = message.author.id 
    if(!message.guild.member(userlog).hasPermission('ADMINISTRATOR'))
    {
        if(!userlog === '292675388180791297') return;
    }
    if(message.guild.id != '388992200630861825') return;

    message.delete().catch();
    var CDkey = Object.keys(CoolDown)
    let guilds = message.guild
    let spaminterval = 10
        if (guilds.r1spam) {
            if (new Date().getTime() - guilds.r1spam < spaminterval*1000) {
                CODE = Math.floor(Math.random() * CDkey.length)
                CODE = CDkey[CODE]
                text = `${CoolDown[CODE]}`
                time = Math.floor(Math.round((spaminterval - (new Date().getTime() - guilds.r1spam) / 1000) * 100) / 100)
                console.log('=> '+userlog + ' has called [ rainbow ] command SPAM')
                message.channel.send(`**${text}** \n*You may use the command in another ${time} seconds*`)
                .then(msg => msg.delete(5000));
                return;
            }
            else { guilds.r1spam = new Date().getTime(); }
        }
        else { guilds.r1spam = new Date().getTime(); }

    let player = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!player) return message.reply("Please Mention a Valid User ");
    let gRole = message.guild.roles.find(`name`,'Rainbow');
    if(!gRole) return message.reply("Couldn't find that role");

    if(player.roles.has(gRole.id)) return message.channel.send("They have that Role.");
    await(player.addRole(gRole.id));
    
    message.channel.send(`Rainbow role is added for <@${player.id}>`);
}

module.exports.help = {
    name : "add"
}
