module.exports = {
    name: 'purge',
    description: 'Purge messages based on how many you want.',
    args: true,
    execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
		    message.reply('that doesn\'t seem to be a valid number.');
        }  
        else if (amount < 2 || amount > 100) {
            message.reply('you need to input a number between 2 and 100.');
        } 
        else {
            message.channel.bulkDelete(amount, true);
            message.channel.send(`Purged ${amount} messages!`);
        }
	},
};