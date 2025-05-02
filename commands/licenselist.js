const db = require('../src/dbconnection.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listlicenses')
        .setDescription('Lists all licenses'),

    async execute(interaction) {
        const query = 'SELECT ip_address, servername FROM licenses';
        db.query(query, async (err, results) => {
            if (err) {
                console.error('Error occurred while fetching data:', err);
                return interaction.reply({
                    content: 'An error occurred while fetching data!',
                    ephemeral: true
                });
            }

            if (results.length === 0) {
                return interaction.reply({
                    content: 'No licenses found in the database.',
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor(0x3498DB) // mavi renk
                .setTitle('Registered Licenses')
                .setFooter({ text: 'License System' })
                .setTimestamp();

            results.forEach((row, index) => {
                embed.addFields({
                    name: `#${index + 1} - ${row.servername}`,
                    value: `IP: ${row.ip_address}`,
                    inline: false
                });
            });

            await interaction.reply({ embeds: [embed] });
        });
    }
};
