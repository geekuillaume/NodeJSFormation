var hello = require(__dirname + "/hello/build/Release/hello");

console.log(hello.hello());
console.log(hello.yourName("Test"))
console.log(hello.yourName({name: "Test"}))

try {
    console.log(hello.yourName(42));
} catch(err) {
    console.log(err);
}

hello.asyncHello(function(name) {
    console.log("Async:", name);
})

hello.timeout5sec("coucou", function(name) {
    console.log("Hello", name);
})
