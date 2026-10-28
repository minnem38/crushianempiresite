var express = require('express');
var router = express.Router();

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
    res.redirect('/app');
});
module.exports = router;
