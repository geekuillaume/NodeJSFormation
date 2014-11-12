var mongoose = require('mongoose'); // Classique require du module mongoose
mongoose.connect('mongodb://localhost/myapp'); // On se connecte au mongodb en localhost

var Blog = require(__dirname + "/blog.js");
// On peut maintenant créer un nouvel objet Blog

var test = new Blog;
test.title = "Test";
test.body = "Hello !"
// On sauvegarde
test.save(function(err, saved) {
  if (err) {
    return console.error("Erreur:", err);
  }
  console.log("Test a été sauvegardé", saved);
});

var noBody = new Blog;
noBody.title = "NoBody";
noBody.author = "Me";
// Ici, body n'est pas indiqué, on va donc avoir une erreur de validation par Mongoose
noBody.save(function(err) {
  if (err) {
    console.log("Erreur:", err);
  }
});

// On peut aussi chercher dans l'ensemble des Blog
Blog.find({title: "Test"}, function(err, blogs) { // Ici, le premier argument est la requête envoyée à MongoDB
  if (err) {
    return console.error("Erreur:", err);
  }
  console.log("Nombre de blogs récupérés:", blogs.length);
});
