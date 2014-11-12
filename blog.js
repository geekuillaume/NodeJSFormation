var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Le Schema correspond au type de donnée prise en charge par Mongoose

var blogSchema = new Schema({ // Ici on crée un nouveau Schema qui correspond à un blog
  title:  String, // On peut définir un champ comme String, Number, ou autre
  author: String,
  body:   {type: String, required: true},
  comments: [{ body: String, date: Date }], // MongoDB accepte aussi des sous documents, ici dans un Array
  date: { type: Date, default: Date.now }, // On peut aussi affecter une valeur par défaut à un champ
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

blogSchema.methods.findSimilarAuthor = function (cb) { // On peut associer des méthodes à un objet Blog
  // Ici on récupère les Blog du même autheur
  return this.model('Blog').find({ author: this.author }, cb);
}

blogSchema.statics.findByAuthor = function (author, cb) { // On peut aussi associer des méthodes à une collection
  // Ici on ajoute Blog.findByAuthor qui récupère les blogs par auteur
  this.find({ author: author }, cb);
}

var Blog = mongoose.model('Blog', blogSchema); // Ensuite, on crée le modèle qui est associé à une collection dans MongoDB
module.exports = Blog;
