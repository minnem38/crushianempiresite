const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

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
async function sendMessage(channelId, title) {
    try {
        const exampleEmbed = new EmbedBuilder()
            .setColor('ffca00')
            .setTitle('New Proposal')
            .setAuthor({ name: title })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setImage(`${process.env.BASE_URL}/images/flags/flag-4x3.png`)
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        const channel = client.channels.cache.get(channelId);
            channel.send(message);
    } catch (err) {
        if (err) {
            return console.error(err);
        }
    }
}
module.exports = client;
module.exports.userHasRole = userHasRole;
module.exports.sendMessage = sendMessage;