var util = require('util');
var EventEmitter = require('events').EventEmitter;

function FooClass() { // On crée une nouvelle classe d'exemple
    this.name = "Bob";
}

util.inherits(FooClass, EventEmitter); // notre classe FooClass hérite de la classe EventEmitter

var test = new FooClass(); // On instancie cette nouvelle classe

test.on("foo", function(name) { // Cette fonction est maintenant un listener sur l'event "foo"
    console.log(this.name, ": Received a foo event from :", name);
})

test.once("foo", function(name) { // Avec once, le listener est détruit après avoir réçu un évent
    console.log("I'm only executed once");
});

setTimeout(function() {
    console.log("Emitting a foo event...");
    test.emit("foo", "Paul")
}, 1000);

console.log("Sending now a foo event...");
test.emit("foo", "Tom"); // On émet un event "foo"

console.log("Sending a bar event");
test.emit("bar"); // L'event bar n'a pas de listener, cette ligne ne fais donc rien
