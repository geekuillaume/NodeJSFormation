#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> asyncSayHello(const Arguments& args) {
  HandleScope scope;

  // On caste le premier argument comme une fonction
  Local<Function> cb = Local<Function>::Cast(args[0]);
  // On passe les arguments à la fonction callback sous forme d'un tableau de Value
  Local<Value> argv[1] = { Local<Value>::New(String::New("world")) };
  // Function possède une méthode Call permettant de l'appeller
  // On lui fourni son 'this', le nombre d'arguments et le tableau des arguments
  cb->Call(Context::GetCurrent()->Global(), 1, argv);

  return scope.Close(Undefined());
}

