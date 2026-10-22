const express = require('express');
const router = express.Router();

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
        res.render('app', {title: 'The Crushian Empire', username: username});
    }
})
module.exports = router;
