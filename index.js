const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const app = express();
app.use(express.json());

const apiRoutes = require('./src/api.js');

app.use('/api', apiRoutes);

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
const commands = [];

const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[WARNING] '${file}' is not a valid command.`);
    }
}

const rest = new REST({ version: '10' }).setToken(config.TOKEN);
(async () => {
    try {
        console.log('Loading slash commands...');
        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID),
            { body: commands },
        );
        console.log('Commands successfully loaded!');
    } catch (error) {
        console.error('Error loading commands:', error);
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
        await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
    }
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} logged in and is ready!`);
});

app.listen(3000, () => {
    console.log(`server ${PORT} started.`);
});

client.login(config.TOKEN);
