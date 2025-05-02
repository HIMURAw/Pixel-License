const db = require('../src/dbconnection.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removelicense')
        .setDescription('Removes a license by IP address and username')
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

        const query = 'DELETE FROM licenses WHERE ip_address = ? AND servername = ?';
        db.query(query, [ipAddress, servername], (err, results) => {
            if (err) {
                console.error('Error occurred while deleting data:', err);
                return interaction.reply({
                    content: 'An error occurred while deleting the data!',
                    ephemeral: true
                });
            }

            if (results.affectedRows === 0) {
                return interaction.reply({
                    content: 'No license found with the provided IP and server name.',
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor(0xFF0000) // Red color
                .setTitle('License Removed!')
                .setDescription(`The license has been successfully removed.`)
                .addFields(
                    { name: 'IP Address', value: ipAddress, inline: true },
                    { name: 'Server Name', value: servername, inline: true }
                )
                .setFooter({ text: 'License System' })
                .setTimestamp();

            interaction.reply({
                content: `Successfully removed: IP: ${ipAddress}, Server: ${servername}`,
                embeds: [embed]
            });
        });
    }
};
