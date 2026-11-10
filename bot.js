const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('clientReady', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});
async function userHasRole(guildId, userId, roleId) {
    try {
        const guild = await client.guilds.fetch(guildId);
        const member = await guild.members.fetch(userId);
        return member.roles.cache.has(roleId);
    } catch (err) {
        if (err.code === 10007) return false;
        throw err;
    }
}

module.exports = client;
module.exports.userHasRole = userHasRole;