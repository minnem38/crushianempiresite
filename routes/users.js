var express = require('express');
var router = express.Router();
const { APP_URL, DISCORD_ID, DISCORD_STATE_SECRET } =
    process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", (_, res) => {
    const params = new URLSearchParams({
        client_id: DISCORD_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: "identify+email",
        state: makeState(DISCORD_STATE_SECRET),
    });
    const URL = `https://discord.com/oauth2/authorize?${params.toString()}`;

    res.redirect(URL);
});

module.exports = router;
