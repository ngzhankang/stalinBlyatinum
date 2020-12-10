// setting up necessary libraries
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

// process the unique discord bot token
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

// declare bot prefix
const prefix = '%';
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


// MAIN PROCESS
// acknowledge bot has connected
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex); //array destructuring
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase(); //bring it to lower caps
    console.info(`Command Input Detected: ${command}`);

    if (!bot.commands.has(command)) return;

    // catch to see if there is any error over here
    try {
        const commando = bot.commands.get(command);
        if (commando.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});