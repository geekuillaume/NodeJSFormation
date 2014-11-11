var http = require('http');

http.createServer(function(request, response) {

    // On peut accéder aux headers client avec : request.headers
    var toSend = "Hello World from " + request.headers.host + "!";

    // Ici, nous indiquons le status code de retour de la requête ainsi que les headers à renvoyer
    // Ces headers sont envoyés dès que le stream devient disponible
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': toSend.length
    });

    // On écrit ensuite sur le Stream de réponse
    response.write(toSend);
    // Puis on ferme la connexion
    response.end();

}).listen(8080);
