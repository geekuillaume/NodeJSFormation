// Require est synchrone et va charger le module dans le contexte d'execution du fichier courant
var _ = require('lodash'); // Ici on va charger ./node_modules/lodash/lodash.js
// _ contient le modules.exports du fichier ./node_modules/lodash/lodash.js


try {
    // Require throw une erreur lorsqu'il ne trouve pas un module
    var test = require("something");
} catch (err) {
    console.log(err);
}

// __dirname est le chemin du dossier contenant le fichier actuel
var bar = require(__dirname + "/bar.js"); // Ici, require va chercher dans le dossier courant et récupérer le fichier bar.js
console.log(bar.name);

var foo = require(__dirname + "/foo"); // On peut aussi require un dossier, par defaut ce sera le fichier index.js qui sera chargé
console.log(foo()); // le module.exports peut contenir n'importe quel type d'objet, comme une fonction

