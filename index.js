var http = require('http');

server = http.createServer(); // server est ici une objet héritant d'EventEmitter
server.listen(8080); // On indique le port sur lequel le serveur doit écouter

server.on("request", function(request, response) { // L'event 'request' est émit lors de l'arrivée d'une nouvelle requête

    // request est un objet héritant de stream.Readable
    // response est un objet héritant de stream.Writable

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

});
