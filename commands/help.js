const Discord = require("discord.js");
const fs = require("fs");
const BotPrefix = require("../prefix.json");

module.exports.run = async (bot,message,args) => {

    if(message.guild.id != '388992200630861825') return;
    let prefix = BotPrefix.prefix;

    let Embed = new Discord.RichEmbed()
    .setAuthor('Help Command')
    .setColor('#ff34b3')
    .addField('Command List',`
\`\`\`prolog\n
\n${prefix}add <mention> => Adds Rainbow Role To Mentioned Member
\n${prefix}del <mention> => Removes Rainbow Role To Mentioned Member
\n${prefix}rainbow on <type> => Switches On The Rainbow Mode 
\n${prefix}rainbow off => Switches Off The Rainbow Mode 
\ntypes => \`cop\` | \`mys\` | \`alien\` | \`ukraine\` | \`rainbow\`
\nusage : => \`rainbow on cop\` OR \`rainbow off\`
\`\`\``);

message.channel.send(Embed)

//message.channel.send('```CSS\nhi```')

}

module.exports.help = {
    name : "help"
}
