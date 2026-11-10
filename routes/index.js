const express = require('express');
const fs = require("fs/promises");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'The Crushian Empire' });
});
router.get('/logout', function (req, res) {
    res.clearCookie('access_token');
    res.redirect('/');
})
router.post('/taxes', async function (req, res) {
    if (!req.cookies.access_token || req.cookies.access_token === 'undefined' || req.cookies.access_token === 'Undefined' || req.cookies.access_token === '') {
        res.redirect(process.env.URL);
    } else {
        const userFetch = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${req.cookies.access_token}`
            }
        });
        const data = await userFetch.json();
        const discordId = data.id;

        async function getUser(discordId) {
            const raw = await fs.readFile('./users.json', 'utf8');
            const data = JSON.parse(raw);
            return data.Users.find((user) => String(user.discordId) === String(discordId));
        }
        const user = await getUser(discordId)
        if (user.taxesPaid) {
            res.redirect('/app/taxes');
        } else {
            async function deleteCode(code) {
                const raw = await fs.readFile('./taxcodes.json', 'utf8');
                const codes = JSON.parse(raw);
                const updated = codes.filter((c) => c !== code);
                if (updated.length === codes.length) {
                    return false;
                }
                await fs.writeFile('./taxcodes.json', JSON.stringify(updated), null, 2);
                return true;
            }
            const removed = await deleteCode(req.body.code);
            if (!removed) console.log('code not found');
            if (removed) {
                res.redirect('/app/taxes');

            }
        }
    }
})
module.exports = router;
