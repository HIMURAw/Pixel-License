const db = require('../DB/dbconnection.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addlicenses')
        .setDescription('Adds a license with an IP address and username')
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('IP address for the license')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('servername')
                .setDescription('Username for the license')
                .setRequired(true)),

    async execute(interaction) {
        const ipAddress = interaction.options.getString('ip');
        const servername = interaction.options.getString('servername');

        const query = 'INSERT INTO licenses (ip_address, servername) VALUES (?, ?)';
        db.query(query, [ipAddress, servername], (err, results) => {
            if (err) {
                console.error('Error occurred while adding data:', err);
                return interaction.reply({
                    content: 'An error occurred while adding the data!',
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00) // Green color
                .setTitle('License Added!')
                .setDescription(`License has been successfully added!`)
                .addFields(
                    { name: 'IP Address', value: ipAddress, inline: true },
                    { name: 'Server Name', value: servername, inline: true }
                )
                .setFooter({ text: 'License System' })
                .setTimestamp();

            interaction.reply({
                content: `Successfully added: IP: ${ipAddress}, Server: ${servername}`,
                embeds: [embed]
            });
        });
    }
};
