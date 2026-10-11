var express = require('express');
var router = express.Router();
const { APP_URL, DISCORD_ID, DISCORD_STATE_SECRET } =
    process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("that's not a valid url");
});

router.get('/discord', async function (req, res) {
    console.log(req.query.code);
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': req.query.code,
            'redirect_uri': 'http://localhost:3000/auth/discord'
        })
    });
    const data = await response.json();
    const token = data.access_token
    res.cookie('access_token', token, {
        httpOnly: true
    });
    res.redirect('http://localhost:3000/');
});
module.exports = router;
