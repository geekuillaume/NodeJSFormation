var express = require('express');
var app = express(); // On crée une nouvelle app Express

app.get('/', function (req, res) { // Le routeur est intégré par défaut, ici on écoute pour GET /
    // Plus besoin de res.writeHead, on envoie directement le contenu de la réponse
    res.send('Hello World!');
});

app.post('/user', function (req, res) { // On peut aussi écouter pour un autre VERB http, ici POST
    res.status(401) // On décrit le code de status à renvoyer au client
        .send({error: "You don't have the right to do this"}); // Ici, express va automatiquement envoyer le JSON
        // Le Content-Type est défini à application/json
});

app.get('/user/:name/:lastName?', function(req, res) { // les paramètres sont définis avec leur nom précédés par ':'
    // On peut aussi avoir des paramètres optionnels avec ?
    var name = req.param('name'); // On accéde aux paramètres de l'url
    var lastName = req.param('lastName');
    if (lastName) {
        res.send("Getting user with its lastName: " + name + " " + lastName);
    }
    else {
        res.send("Getting user: " + name);
    }
})

var server = app.listen(8080, function () { // De même qu'avec http, on lance l'écoute sur le port 8080

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

})
