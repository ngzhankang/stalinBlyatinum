const { time } = require("console");
const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Get your own Ping!',
    execute(message, args) {
      message.channel.send("Pinging...").then(m =>{
        // to calculate the user's ping
        var yourPing = new Date().getTime() - message.createdTimestamp
        // basic embedding of message
        var embed = new Discord.MessageEmbed()
        .setTitle(':ping_pong: Pong!')
        .addFields(
          { name: 'Your Ping:', value: `${yourPing}ms` }
        )
        .setColor('#0099ff')
        // Then It Edits the message with the ping variable embed that you created
        m.edit(embed)
      })
    },
};