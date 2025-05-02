const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const db = require('./DB/dbconnection.js')
const PORT = 3000;

const app = express();
app.use(express.json());

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


app.get("/check_ip", (req, res) => {
    const { ip } = req.query;

    if (!ip) {
        sendToDiscord("❌ IP could not be obtained or was sent incomplete.");
        return res.status(400).send("INVALID");
    }

    db.query("SELECT * FROM licenseDB WHERE ip_address = ?", [ip], (err, result) => {
        if (err) {
            console.error(err);
            sendToDiscord(`⚠️ Database error: ${err.message}`);
            return res.status(500).send("ERROR");
        }

        if (result.length > 0) {
            sendToDiscord(`✅ Licensed IP verified: \`${ip}\``);
            return res.send("VALID");
        } else {
            sendToDiscord(`❌ Invalid licensed IP attempt: \`${ip}\``);
            return res.send("INVALID");
        }
    });
});

function sendToDiscord(title, ip, userAgent, host, status) {
    const colorMap = {
        VALID: 0x00ff00,
        INVALID: 0xff0000,
        ERROR: 0xffff00
    };

    const embed = {
        title: title,
        color: colorMap[status] || 0x3498db,
        fields: [
            { name: "IP Address", value: ip || "Unknown", inline: false },
            { name: "User Agent", value: userAgent || "Unknown", inline: false },
            { name: "Host", value: host || "Unknown", inline: false },
        ],
        timestamp: new Date(),
        footer: {
            text: "Pixel Web License System",
        },
    };

    axios.post(config.LICANCE_WEBHOOK, {
        embeds: [embed],
    }).catch(err => {
        console.error("Discord Webhook Error:", err.message);
    });
}



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});

client.login(config.TOKEN);
