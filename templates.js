var express = require('express');
var app = express();

app.set('views', './views'); // Nous indiquons le répertoire dans lequel Express doit chercher ses templates
app.set('view engine', 'jade'); // et ici le moteur utilisé pour compiler les templates
// En interne, express va faire un require('jade') pour récupérer le moteur de template

app.get('/', function (req, res) {
    // Express va chercher le fichier views/index.jade et injecter l'objet en deuxième paramètre
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(8080, function () { // De même qu'avec http, on lance l'écoute sur le port 8080

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

})
