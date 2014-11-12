var chai = require("chai"); // Chai permet d'écrire des tests plus facilement
chai.should(); // on initialise les should sur tout les objets


describe("Array", function() { // Describe décrit une catégorie de tests
    describe("Length", function() { // On peut faire autant de sous-catégories que l'on veut
        it("should have a proper length", function() { // Chaque test unitaire est défini par un bloc "it"
            // Si la fonction ne throw pas, le test passe
            [1,2,3].should.have.length(3);
        });
        it("will fail", function() {
            throw new Error("Fail");
        });
        it("should have a null length when empty", function() {
            [].should.have.length(0);
        });
    });

    describe("IndexOf", function() {
        it("should find the index if in array", function() {
            [1,2,3].indexOf(2).should.equal(1);
        });
        it("should no find the index if not in array", function() {
            [1,2,3].indexOf(5).should.equal(-1);
        });
    });
});

var User;

describe("User", function() {
    // Mocha propose les hooks: before, beforeEach, after, afterEach
    beforeEach(function() {
        User = {name: "Foo", lastName: "Bar"};
    })
    it("should have all required fields", function() {
        User.should.have.property("name");
        User.should.have.property("lastName");
    });
    it("should remove its name", function () {
        User.name = undefined; // Ici nous changeons User mais les prochains tests aurons un User propre
        User.should.not.have.property("name");
    });
    it("should change its name", function() {
        User.name = "test";
        User.name.should.equal("test");
    });
});

describe("Timeout", function() {
    it("should fire the timeout", function(done) { // Les fonctions asynchrones peuvent aussi être testées
        setTimeout(function() {
            done(); // Il suffit d'appeller la fonction done à la fin de notre test
        }, 100);
    });
    it("will fail !", function(done) {
        setTimeout(function() {
            done(new Error("FAIL")); // Si le premier argument de done n'est pas undefined, une erreur est affichée
        }, 100);
    })
});
