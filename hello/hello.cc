#include <node.h>
#include <v8.h>
// Headers nécéssaires pour la compilation
using namespace v8;

Handle<Value> asyncSayHello(const Arguments& args);
Handle<Value> timeout5sec(const Arguments& args);

Handle<Value> sayHello(const Arguments& args) { // Cette fonction retourne une valeur dans un Handle
  HandleScope scope; // On crée ici un Scope interne à la fonction
  // Il est nécéssaire de créer un Scope au début de chaque fonction
  // sinon le scope courant reste celui de la fonction appellante

  return scope.Close(String::New("world")); // Ici, on ferme notre scope en renvoyant la string
  // Cette String est renvoyée en tant que Handle dans le Scope parent
}

Handle<Value> yourName(const Arguments& args) {
  HandleScope scope; // On crée ici un Scope interne à la fonction

  if (args.Length() != 1) { // On peut accéder aux arguments depuis le premier paramètre envoyé à la fonction
    ThrowException(Exception::TypeError(String::New("You need to have one argument")));
    // Ici, on Throw une exception si il n'y a pas d'argument
    return scope.Close(Undefined());
  }

  if (args[0]->IsString()) { // On peut aussi tester le type d'argument
    // Ici on crée une nouvelle variable dans le Scope local
    // Value est la classe mère de toute les valeurs, ainsi on peut affecter un String à une Value
    // Cette string est une concaténation de deux Strings
    Local<Value> name = String::Concat(String::New("Hello Module : "), args[0]->ToString());
    return scope.Close(name); // On retourne notre String
  } else if (args[0]->IsObject()) { // Si l'argument est un objet alors on retourne un objet
    Local<Object> obj = Object::New(); // On crée un nouvel objet dans notre scope courant
    // et on lui assigne la propriété name
    obj->Set(String::NewSymbol("name"), // New Symbol évite de recréer une string si le symbole existe déjà
      String::Concat(String::New("Hello Module : "),
        args[0]->ToObject() // On récupère l'objet
        ->Get(String::NewSymbol("name")) // Ensuite on accède à sa propriété name qui est un Value*
        ->ToString())); // Et on convertit cette Value en String*
    return scope.Close(obj);
  } else {
    ThrowException(Exception::TypeError(String::New("You need to provide a string or an object")));
    return scope.Close(Undefined());
  }
}

void init(Handle<Object> exports) { // Chaque module doit avoir une fonction d'initiation
  // Cette fonction est appellée lors d'un require() du module
  // et permet de définir le module.exports
  exports->Set(String::NewSymbol("hello"),
      FunctionTemplate::New(sayHello)->GetFunction());
  // Ici, on affecte à l'objet exports, la propriété "hello" qui correspond à la fonction sayHello
  // FunctionTemplate permet d'exposer une fonction au JS en ajoutant un contexte à celle-ci
  exports->Set(String::NewSymbol("yourName"),
      FunctionTemplate::New(yourName)->GetFunction());

  exports->Set(String::NewSymbol("asyncHello"),
      FunctionTemplate::New(asyncSayHello)->GetFunction());

  exports->Set(String::NewSymbol("timeout5sec"),
      FunctionTemplate::New(timeout5sec)->GetFunction());

}

NODE_MODULE(hello, init) // NODE_MODULE est une macro définissant le point d'entré du module, ainsi que son nom
