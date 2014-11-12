var express = require('express');
var cookieParser = require('cookie-parser'); // cookie-parser est un autre module d'Express à installer avec npm install
var app = express();

app.use(cookieParser());

app.get('/', function (req, res) {
    res.send({cookies: req.cookies}); // On peut accéder aux cookies avec req.cookies
});

app.get('/setCookie', function (req, res) {
    res.cookie("foo", "bar"); // Ici, on set un cookie qui sera stocké par l'utilisateur
    res.send("OK");
});

var server = app.listen(8080, function () { // De même qu'avec http, on lance l'écoute sur le port 8080

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

})
