let express = require('express');
let morgan = require("morgan");
let cors = require("cors");
let path = require("path");
let serveStatic = require("serve-static");

let app = express();

app.use(morgan("combined"));
app.use(cors());

const filePath =  path.resolve(__dirname);

app.use(serveStatic(filePath, {'index': 'index.html'}));

app.get('/',function(req,res){
    res.sendFile(filePath + '/index.html');
});

app.listen(process.env.PORT, function(){
    console.log(new Date(),' Website started');
})