var node = document.getElementById('app');
var storedToken = localStorage.getItem('token');

var app = Elm.Main.embed(node, storedToken ? storedToken : null);

// app.ports.setName.subscribe(function(name) {
//   localStorage.setItem('name', name);
// });
