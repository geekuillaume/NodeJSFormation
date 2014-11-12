#include <unistd.h>
#include <node.h>
#include <v8.h>

using namespace v8;

struct TimeoutBaton { // Cette structure va nous servir à passer des informations à nos fonctions
    uv_work_t request;
    Persistent<Function> callback;
    Persistent<Value> toPass;
};

void timeoutAsync(uv_work_t *req) { // Cette fonction est executée dans un des Thread de la libuv
    // Ici on peut accéder au TimeoutBaton avec req->data
    sleep(5);
    // On peut executer des tâches très lourdes en CPU, elles ne bloqueront pas l'event loop
    // Cependant, on ne peut pas acceder à Node.js depuis ce Thread
}

void timeoutAfter(uv_work_t *req, int ret) { // Cette fonction est executée après que timeoutAsync est retournée
    // On peut acceder à l'API Node.js depuis cette fonction qui est executée dans le thread principal
    HandleScope scope;

    TimeoutBaton *baton = static_cast<TimeoutBaton *>(req->data);

    Handle<Value> argv[1] = {Local<Value>::New(baton->toPass)};
    // On appele notre callback
    baton->callback->Call(Context::GetCurrent()->Global(), 1, argv);
    // Les Handle Persistent on besoin d'être désalouées avec Dispose pour éviter les fuites mémoire
    baton->callback.Dispose();
    baton->toPass.Dispose();
    // Il ne faut pas oublier de désallouer la structure baton
    delete baton;
}

Handle<Value> timeout5sec(const Arguments& args) {
  HandleScope scope;

  TimeoutBaton *baton = new TimeoutBaton;

  baton->request.data = baton;
  baton->callback = Persistent<Function>::New(Local<Function>::Cast(args[1]));
  baton->toPass = Persistent<Value>::New(args[0]);

  // Cette fonction va ajouter un travail à la thread pool de la libuv
  // Ce travail est rattaché à la default_loop de Node.js
  uv_queue_work(uv_default_loop(), &baton->request, timeoutAsync, timeoutAfter);

  return scope.Close(Undefined());
}
