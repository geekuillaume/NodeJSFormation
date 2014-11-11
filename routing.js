var http = require('http');
var url = require('url'); // Le module URL contient plusieurs fonctions très utiles pour le parsing d'URLs

server = http.createServer();
server.listen(8080);

var routes = {}; // L'objet routes contient les functions attachées à chaques routes

routes['/hello'] = function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Content-Length": 10
    });
    res.write("Hi there !");
}

routes['/bye'] = function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Content-Length": 9
    });
    res.write("Bye Bye !");
}

routes['/404'] = function(req, res) {
    res.writeHead(404, {
        "Content-Type": "text/plain",
        "Content-Length": 22
    });
    res.write("There's nothing here !");
}

server.on("request", function(req, res) {

    var parsed = url.parse(req.url); // Nous parsons l'URL afin d'extraire le pathname

    if (routes[parsed.pathname]) { // Si une route est enregistrée, on redrige vers celle-ci
        routes[parsed.pathname](req, res);
    }
    else {
        routes["/404"](req, res); // Sinon on redirige vers la page de 404
    }

});
