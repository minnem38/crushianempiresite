const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/app', function(req, res) {
    if (!req.cookies.access_token) {
        res.redirect(process.env.URL);
    } else {
        res.render('app', { title: 'Express' });
    }
})
module.exports = router;
