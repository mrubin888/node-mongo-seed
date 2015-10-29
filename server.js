var app = require('./bin/todo-api.js');

// listen
var portNo = process.env.PORT || 80;
app.listen(portNo);
console.log("App listening on port " + portNo);
