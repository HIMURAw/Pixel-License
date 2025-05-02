const config = require('../config.json');

app.get("/api/check_ip", (req, res) => {
    const { ip } = req.query;

    if (!ip) {
        sendToDiscord("❌ IP could not be obtained or was sent incomplete.");
        return res.status(400).send("INVALID");
    }

    db.query("SELECT * FROM licance WHERE ip_address = ?", [ip], (err, result) => {
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
