const Discord = require("discord.js");
const fs = require("fs");
const BotPrefix = require("../prefix.json");

module.exports.run = async (bot,message,args) => {
    
    let msg = message.content.split(' ')
    let prefix = BotPrefix.prefix;

    let CoolDown = JSON.parse(fs.readFileSync("./CoolDownMsg.json","utf8"));
    let ColorFile = JSON.parse(fs.readFileSync("./rainbow.json","utf8"));

    userlog = message.author.id 
    if(!message.guild.member(userlog).hasPermission('ADMINISTRATOR'))
    {
        if(!userlog === '292675388180791297') return;
    }

    SWITCH = msg[1]
    code = msg[2]
    if(!SWITCH) return message.channel.send('Mention Swtich [ on || off ] \n**Usage: ** `'+prefix+'rainbow on <type>`').then(msg => msg.delete(5000));
    if(SWITCH === 'off') code = 'rainbow';

    key = 1
    pin = 0;
    mod = 0;
    role = 'Rainbow'

    let gRole = message.guild.roles.find(`name`,role);
    if(!gRole) return message.reply("Rainbow Role is Missing in this Server");

    switch(code)
    {
        case 'cop' : var ColorCode = Object.keys(ColorFile.cop)
        break;
        case 'rainbow' : var ColorCode = Object.keys(ColorFile.rainbow)
        break;
        case 'alien' : var ColorCode = Object.keys(ColorFile.alien)
        break;
        case 'mys' : var ColorCode = Object.keys(ColorFile.mys)
        break;
        case 'ukraine' : var ColorCode = Object.keys(ColorFile.ukraine )
        break;
        default : return message.channel.send('Mention Type [ `cop` || `rainbow` || `alien` || `mys` || `ukraine` ] \n**Usage: ** `'+prefix+'rainbow on cop`').then(msg => msg.delete(5000));
    }
    //if(message.guild.id === '445412739607691265' || message.guild.id === '423211874855682059' || message.guild.id === '388992200630861825' )
    if(message.guild.id === '442704155644264450')
    {
        //message.delete().catch();
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
                else { guilds.r1spam = new Date().getTime();
                        setTimeout(function(){
                            if(code != 'cop' || code != 'rainbow' || code != 'alien' || code != 'mys' || code != 'ukraine' ) code = 'rainbow'
                            console.log(`Rainbow Command Inizilized Type: ${code}`)
                            console.log('=> '+userlog + ' has called [ rainbow ] command')
                            pin = 1;
                        },500)
                    }
            }
            else { guilds.r1spam = new Date().getTime();
                    setTimeout(function(){
                        if(code != 'cop' || code != 'rainbow' || code != 'alien' || code != 'mys' || code != 'ukraine' ) code = 'rainbow'
                        console.log(`Rainbow Command Inizilized Type: ${code}`)
                        console.log('=> '+userlog + ' has called [ rainbow ] command')
                        pin = 1;
                    },500)
                }
    }
    else {  return;  }
    guildID = message.guild
    setTimeout(function()
    {
        if(pin === 1)
        {
            if(SWITCH === 'on' || SWITCH === 'On' || SWITCH === 'ON')
            {
                if(guildID.on1 != 1) //return message.channel.send('Please off the rainbow mode before changing type')
                {
                    console.log('Rainbow ON '+message.guild.id)
                    guildID.on1 = 1;
                    intervalA = setInterval(function(){
                        mod = mod + 1;
                        Rcolor(mod,ColorCode)
                    },30000)
                }
                else
                {
                    return message.channel.send('Please turn off the Rainbow mode before changing type \n**USe** `'+prefix+'rainbow off` **to switch off Rainbow**')
                    .then(msg => msg.delete(5000));
                }
            }
            else
            {
                if(SWITCH === 'off' || SWITCH === 'Off' || SWITCH === 'OFF')
                {
                    if(guildID.on1 === 1) 
                    {
                        guildID.on1 = 0;
                        console.log('Rainbow OFF '+message.guild.id)
                        clearInterval(intervalA)
                    }
                    else return;
                } 
                else return;
            }
        }
    },1000)
    
    
    function Rcolor(mod,ColorCode)
    {
            path = mod%ColorCode.length
            newrole = gRole.edit({
                color: ColorCode[path]
            })
           
    }
}
module.exports.help = {
    name : "rainbow"
}
