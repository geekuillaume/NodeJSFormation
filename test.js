var express = require('express');
// Router est une classe incluse dans Express 4
// On l'utilise pour découper les routes de notre application
var router = express.Router();

// On ajoute un middleware uniquement pour cette route
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
// On utilise get, post,... comme normalement
// Les routes seront précédées par celle qui a été définie dans index.js
router.get('/', function(req, res) {
  res.send('Tests home page');
})
router.get('/about', function(req, res) {
  res.send('About Tests');
})

module.exports = router;
