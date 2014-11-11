var fs = require('fs'); // le module fs gère le filesystem

var testRead = fs.createReadStream(__dirname + '/test.txt'); // on crée un Readable Stream depuis un fichier

testRead.pipe(process.stdout); // On rédirige le stream vers le Writable Stream process.stdout
// Le stream va lire depuis le disque et afficher le contenu du fichier sur la sortie standard


// On peut aussi écrire dans un fichier
var testWrite = fs.createWriteStream(__dirname + '/test2.txt'); // On a maintenant un Writable Stream

testWrite.write("Hello !"); // On peut alors écrire sur ce stream

testWrite.close();

// Un stream peut à la fois être Writable et Readable, c'est un Duplex

var zlib = require('zlib');

// Ici zlib.createGzip() crée un Duplex Stream qui compresse les données reçues et les write par la suite
fs.createReadStream(__dirname + '/test.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream(__dirname + '/compressed.txt.gz'));
