var express = require('express');
const fs = require("fs/promises");
var router = express.Router();
require('dotenv').config();
const bot = require('../bot');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send("that's not a valid url");
});

router.get('/discord', async function (req, res) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': req.query.code,
            'redirect_uri': 'https://crushianempire.duckdns.org/auth/discord'
        })
    });
    const data = await response.json();
    const token = data.access_token
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: true
    });
    const userFetch = await fetch('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const userData = await userFetch.json();
    const username = userData.global_name;
    const discordId = userData.id;
    const raw = await fs.readFile('./users.json', 'utf8');
    const users = JSON.parse(raw);
    let user = users.Users.find((u) => String(u.discordId) === String(discordId));
    if (user) {

    } else if (!user) {
        const isMember = await bot.userHasRole(
            process.env.GUILD_ID,
            discordId,
            process.env.MEMBER_ROLE_ID,
        );
        const isAlly = await bot.userHasRole(
            process.env.GUILD_ID,
            discordId,
            process.env.ALLY_ROLE_ID,
        );
        if (isMember) {
            user = {username: username, discordId: discordId, taxesPaid: false, role: 'member'};
            users.Users.push(user);
        } else if (isAlly) {
            user = {username: username, discordId: discordId, taxesPaid: false, role: 'ally'};
            users.Users.push(user);
        } else {
            user = {username: username, discordId: discordId, taxesPaid: false, role: 'visitor'};
            users.Users.push(user);
        }
    }
    await fs.writeFile('./users.json', JSON.stringify(users, null, 2));
    res.redirect('/app');
});
module.exports = router;
