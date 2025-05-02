const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[UYARI] '${file}' geçerli bir komut değil.`);
    }
}

const rest = new REST({ version: '10' }).setToken(config.TOKEN);
(async () => {
    try {
        console.log('Slash komutları yükleniyor...');
        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID),
            { body: commands },
        );
        console.log('Komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error('Komutları yüklerken hata:', error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Komut çalıştırılırken bir hata oluştu.', ephemeral: true });
    }
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} giriş yaptı ve hazır!`);
});

client.login(config.TOKEN);
