const express = require('express');
const router = express.Router();
require('dotenv').config();
const fs = require('fs/promises');
const bot = require("../bot");

router.get('/', async function (req, res) {
    if (!req.cookies.access_token || req.cookies.access_token === 'undefined' || req.cookies.access_token === 'Undefined' || req.cookies.access_token === '') {
        res.redirect(process.env.URL);
    } else {
        const userFetch = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${req.cookies.access_token}`
            }
        });
        const data = await userFetch.json();
        const username = data.global_name;
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
            res.render('app', {title: 'The Crushian Empire', username: username});
        } else if (isAlly) {
            res.render('ally-dash', {title: 'The Crushian Empire', username: username});
        } else {
            res.render('visitor-dash', {title: 'The Crushian Empire', username: username});
        }
    }
})
router.get('/taxes', async function (req, res) {
    if (!req.cookies.access_token || req.cookies.access_token === 'undefined' || req.cookies.access_token === 'Undefined' || req.cookies.access_token === '') {
        res.redirect(process.env.URL);
    } else {
        const userFetch = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${req.cookies.access_token}`
            }
        });
        const data = await userFetch.json();
        const username = data.global_name;
        const discordId = data.id;

        async function getUser(discordId) {
            const raw = await fs.readFile('./users.json', 'utf8');
            const data = JSON.parse(raw);
            return data.Users.find((user) => String(user.discordId) === String(discordId));
        }
        const user = await getUser(discordId)
        if (user.taxesPaid && user.role === "member") {
            res.render('taxes-paid', {title: 'The Crushian Empire', username: username});
        } else if (!user.taxesPaid && user.role === "member") {
            res.render('taxes', {title: 'The Crushian Empire', username: username});
        } else {
            res.redirect('/app');
        }
    }
})
module.exports = router;
