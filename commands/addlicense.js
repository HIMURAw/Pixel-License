const db = require('../src/dbconnection.js');
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lisansekle')
        .setDescription('Bir IP adresi ve kullanıcı adı ile lisans ekler')
        .addStringOption(option => 
            option.setName('ip')
                .setDescription('Lisansın ekleneceği IP adresi')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('servername')
                .setDescription('Lisansın ekleneceği kullanıcı adı')
                .setRequired(true)),
    
    async execute(interaction) {
        const ipAddress = interaction.options.getString('ip');
        const servername = interaction.options.getString('servername');

        const query = 'INSERT INTO licenses (ip_address, servername) VALUES (?, ?)';
        db.query(query, [ipAddress, servername], (err, results) => {
            if (err) {
                console.error('Veri eklerken hata oluştu:', err);
                return interaction.reply({
                    content: 'Veri eklenirken bir hata oluştu!',
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00) // Yeşil renk
                .setTitle('Lisans Eklendi!')
                .setDescription(`Başarıyla lisans eklendi!`)
                .addFields(
                    { name: 'IP Adresi', value: ipAddress, inline: true },
                    { name: 'Sunucu İsmi', value: servername, inline: true }
                )
                .setFooter({ text: 'Lisans Sistemi' })
                .setTimestamp();

            interaction.reply({
                content: `Başarıyla eklendi: IP: ${ipAddress}, Server: ${servername}`,
                embeds: [embed]
            });
        });
    }
};
