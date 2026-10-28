const express = require('express');
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
    console.log(req.query.code);
    res.redirect('/app');
})
module.exports = router;
